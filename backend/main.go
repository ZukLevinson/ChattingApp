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

	hub := createHub()
	go hub.runHub()

	http.HandleFunc("/ws", func (w http.ResponseWriter, r *http.Request) {
		serveAPI(w, r, hub)
	})

	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}