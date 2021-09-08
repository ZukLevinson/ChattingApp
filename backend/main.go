package main

import (
	"flag"
	"log"
	"net/http"
	"strings"
)

var addr = flag.String("addr", ":8080", "http service address")

func serveAPI(w http.ResponseWriter, r *http.Request, hub *Hub) {
	middleman := createMiddleman(hub, w, r)
	middleman.hub.register <- middleman

	switch strings.TrimLeft(r.URL.Path, "/api"){
	case "/chatters":
		go middleman.writingFromTheHubToWS()
		go middleman.readingFromWSToHub()
		
	case "/messages":
		
	case "/groups":

	default:
		http.Error(w, "Uknown path", http.StatusNotFound)
		return
	}
}

func main () {
	flag.Parse()

	hub := createHub()
	go hub.runHub()

	http.HandleFunc("/api", func (w http.ResponseWriter, r *http.Request) {
		serveAPI(w, r, hub)
	})

	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}