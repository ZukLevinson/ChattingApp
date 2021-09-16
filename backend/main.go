package main

import (
	"flag"
	"log"
	"net/http"
)

var addr = flag.String("addr", ":8080", "http service address")

func serveAPI(w http.ResponseWriter, r *http.Request, hub *Hub) {
	middleman := createMiddleman(hub, w, r)
	middleman.hub.register <- middleman
	
	go middleman.writingFromTheHubToWS()
	go middleman.readingFromWSToHub()
}

func main () {
	flag.Parse()

	messageHub := createHub("Message")
	statusHub := createHub("Status")

	go messageHub.runHub()
	go statusHub.runHub()

	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		log.Println("Request from ", r.URL.Path)

		switch(r.URL.Path) {
		case "/messages": 
			serveAPI(w, r, messageHub)
		case "/statuses": 
			serveAPI(w, r, statusHub)
		default:
			log.Panic("No available routes")
			w.WriteHeader(404)
		}
	})

	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}