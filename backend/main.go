package main

import (
	"flag"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", ":8080", "http service address")

func serveAPI(w http.ResponseWriter, r *http.Request, hub *Hub) {
	middleman, err := createMiddleman(hub, w, r)

	if(err != nil) {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Printf("Error creating middleman - %v", err)
	} else {
		log.Printf("Created middleman with userId of - %v", middleman.user.UserId)
		
		registrationError := middleman.hub.registerMiddleman(middleman)

		if(registrationError != nil) {
			log.Println(registrationError.Error())

			closeMessage := websocket.FormatCloseMessage(websocket.CloseNormalClosure, registrationError.Error())

			middleman.conn.WriteMessage(websocket.CloseMessage, closeMessage)
			middleman.conn.Close()

			log.Println(registrationError.Error())
		} else {
			log.Println("Successfuly initiated connection, now active")

			go middleman.writingFromTheHubToWS()
			go middleman.readingFromWSToHub()
		}
	}
}

func main () {
	flag.Parse()

	groupper := createHubber()

	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		log.Println("Request from ", r.URL.Path)

		switch(r.URL.Path) {
		case "/messages":
			queryMap := r.URL.Query()

			groupId, err := strconv.Atoi(queryMap.Get("groupId"))

			if(err != nil){ // Emit http error since no group with groupId was found
				errMessage := "Group id must be an integer"
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte(errMessage))

				log.Panicln(errMessage + " - " + queryMap.Get("groupId"))
			} else {
				relevantHub := groupper.getHub(groupId)

				if(relevantHub == nil) {
					newHub, err := createHub(groupId)

					if(err != nil) {
						log.Println(err)
						w.WriteHeader(http.StatusInternalServerError)
						w.Write([]byte(err.Error()))
					} else {
						groupper.recordNewHub(groupId, newHub)
						log.Printf("Created Hub - %v", groupId)

						relevantHub = groupper.getHub(groupId)

						go relevantHub.initiateHub() // Initiate hub
						serveAPI(w, r, relevantHub)
					}
				} else {
					serveAPI(w, r, relevantHub)
				}
			}
		default:
			log.Panic("No available routes")
			w.WriteHeader(http.StatusNotFound)
		}
	})

	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}