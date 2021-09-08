package main

import (
	"flag"
	"log"
	"net/http"
	"strings"
)

var addr = flag.String("addr", ":8080", "http service address")

func serveAPI(w http.ResponseWriter, r *http.Request) {
	switch strings.TrimLeft(r.URL.Path, "/api"){
	case "/chatters":

	case "/messages":

	case "/groups":

	default:
		http.Error(w, "Uknown path", http.StatusNotFound)
		return
	}
}

func main () {
	flag.Parse()

	http.HandleFunc("/api", serveAPI)

	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}