package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	writeWait = 10 * time.Second // Time allowed to write a message to the peer.
	pongWait = 60 * time.Second	// Time allowed to read the next pong message from the peer.
	pingPeriod = (pongWait * 9) / 10 // Send pings to peer with this period. Must be less than pongWait.
	maxMessageSize = 512 // Maximum message size allowed from peer.
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// Middleman acts like a messanger between the WS connection and the hub
type Middleman struct {
	hub *Hub
	conn *websocket.Conn // The websocket connection.
	send chan []byte // Buffered channel of outbound messages.
	userId string
}

type User struct {
	userId string
}

func createMiddleman(hub *Hub, w http.ResponseWriter, r *http.Request) (*Middleman, error) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	conn, err := upgrader.Upgrade(w, r, nil) // Upgrading http connection to WS
	
	if err != nil {
		panic(err)
	} else {
		var u User

		err = json.NewDecoder(r.Body).Decode(&u)

		if err != nil {
			log.Panic("Error in parsing")

			return nil, &time.ParseError{}
		}

		return &Middleman{hub: hub, conn: conn, send: make(chan []byte, 256), userId: u.userId}, nil
	}
}

func (m *Middleman) unregister(h *Hub) {
	delete(h.middlemans, m)
	close(m.send)
}

// Pumps the message from the WS to the Hub
func (m *Middleman) readingFromWSToHub() {
	defer func() {
		m.hub.unregister <- m
		m.conn.Close()
	}()

	m.conn.SetReadLimit(maxMessageSize)
	m.conn.SetReadDeadline(time.Now().Add(pongWait))
	m.conn.SetPongHandler(func(string) error { m.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	
	for {
		_, message, err := m.conn.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("WS -> Hub(%v) error: %s", err, m.hub.name)
			}
			
			break
		}
		
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		m.hub.broadcast <- message // Broadcasts the message
	}
}

// Pumps messages from the hub to the WS connection
func (m *Middleman) writingFromTheHubToWS() {
	ticker := time.NewTicker(pingPeriod) // Ticking channel

	defer func() {
		ticker.Stop()
		m.conn.Close()
		log.Printf("Connection with middleman closed!")
	}()

	for {
		select {
			// This case is activated when a message has been sent in the middleman's channel
			case message, ok := <-m.send:
				m.conn.SetWriteDeadline(time.Now().Add(writeWait))

				if !ok {
					m.conn.WriteMessage(websocket.CloseMessage, []byte{})
					return
				}

				w, err := m.conn.NextWriter(websocket.TextMessage)

				if err != nil {
					return
				}

				w.Write(message) // Write the first message

				// If theres any other messages - here we handle them
				for i := 0; i < len(m.send); i++ {
					w.Write(newline)
					w.Write(<-m.send)
				}

				if err := w.Close(); err != nil {
					return
				}

			case <- ticker.C:
				m.conn.SetWriteDeadline(time.Now().Add(writeWait))
				if err := m.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
					return
				}
		}
	}
}