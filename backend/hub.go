package main

import "log"

// The hub maintains the different channels while keeping records of the middlemans
type Hub struct {
	name string // Hub name
	middlemans map[*Middleman]bool // Registered middlemans
	broadcast chan []byte // Messages from  middlemans
	register chan *Middleman // Register requests from middlemans
	unregister chan *Middleman // Unregister requests from middlemans
}

// Creates new Hub
func createHub(name string) *Hub {
	// Returns the pointer of the new Hub
	return &Hub{
		name: name,
		broadcast: make(chan []byte),
		register: make(chan *Middleman),
		unregister: make(chan *Middleman),
		middlemans: make(map[*Middleman]bool),
	}
}

func (h *Hub) runHub() {
	for {
		select {
			// Incoming registered middleman
			case middleman := <-h.register:
				log.Println("Incoming registered middleman")
				h.middlemans[middleman] = true

			// Incoming unregistered middleman
			case middleman := <-h.unregister:
				if _, ok := h.middlemans[middleman]; ok {
					log.Println("Incoming unregistered middleman")
					middleman.unregister(h)
				}

			// Incoming message
			case message := <- h.broadcast:
				// Loops through all the middlemans
				for middleman := range h.middlemans {
					select{
						case middleman.send <- message: // If the middleman's channel is active, insert the message
							log.Println("Spreaded the message '",message, "'")
						default:
							middleman.unregister(h)
					}
				}
		}
	}
}