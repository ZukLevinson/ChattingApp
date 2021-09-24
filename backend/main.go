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

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	} else {
		log.Println("Created middleman with userId of - ", middleman.userId)
		registrationErr := middleman.hub.registerMiddleman(middleman)

		if registrationErr != nil {
			closeMessage := websocket.FormatCloseMessage(websocket.CloseNormalClosure, registrationErr.Error())

			middleman.conn.WriteMessage(websocket.CloseMessage, closeMessage)
			middleman.conn.Close()

			log.Println(registrationErr.Error())
		} else {
			go middleman.writingFromTheHubToWS()
			go middleman.readingFromWSToHub()
		}
	}
}

func main() {
	flag.Parse()

	groupHubs := make(map[int]*Hub)

	statusHub := createHub("Status", []string{"1"})

	go statusHub.runHub()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Request from ", r.URL.Path)

		switch r.URL.Path {
		case "/messages":
			queryMap := r.URL.Query()

			groupId, err := strconv.Atoi(queryMap.Get("groupId"))

			if err != nil { // Emit http error since no group with groupId was found
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("Unknown group id!"))

				log.Panicln("Uknown groupId - " + queryMap.Get("groupId"))
			} else {
				group, err := createGroupInstance(groupId)

				if err != nil { // Emit http error since no group with groupId was found
					w.WriteHeader(http.StatusInternalServerError)
					w.Write([]byte("Cannot fetch group data!"))

					panic("Cannot fetch group data")
				}
				group.getGroupUsers()

				allowedUsersIds := []string{}

				for _, userInGroup := range *group.Users {
					allowedUsersIds = append(allowedUsersIds, strconv.Itoa(userInGroup.UserId))
				}

				if groupHubs[groupId] == nil {
					groupHubs[groupId] = createHub(queryMap.Get("groupId"), allowedUsersIds)
					log.Println("Created Hub - ", groupHubs[groupId], ", Group - ", group, ", Allowed Users - ", allowedUsersIds)
				} else {
					groupHubs[groupId].updateUsers(allowedUsersIds)
				}

				go groupHubs[groupId].runHub()
				serveAPI(w, r, groupHubs[groupId])
			}
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
