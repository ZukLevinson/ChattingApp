package main

import (
	"errors"
	"log"
)

// The hub maintains the different channels while keeping records of the middlemans
type Hub struct {
	name string // Hub name
	middlemans map[*Middleman]bool // Registered middlemans
	broadcast chan []byte // Messages from  middlemans
	register chan *Middleman // Register requests from middlemans
	unregister chan *Middleman // Unregister requests from middlemans
	allowedUsers map[string]*Middleman
}

func (h *Hub) listAllowedUsers() []string {
	keys := make([]string, 0, len(h.allowedUsers))

    for k := range h.allowedUsers {
        keys = append(keys, k)
    }
	
	return keys
}

func (h *Hub) checkIfInAllowedUsers(userId string) bool {
	allowedUsersList := h.listAllowedUsers()
	
    for _, val := range allowedUsersList {
		log.Println("Checking user - ", val)
        if (val == userId) {
			log.Println("User", val, "is valid!")
			return true
		}
    }
	
	return false
}

func (h *Hub) registerMiddleman(middleman *Middleman) error {
	if(h.checkIfInAllowedUsers(middleman.userId)){
		h.register<-middleman
		log.Println("Registered middleman to Hub with the name - ", h.name)

		return nil
	} else {
		log.Println("Middleman not allowed!")

		return errors.New("UserId not allowed")
	} 
}

// Creates new Hub
func createHub(name string, allowedUsersList []string) *Hub {
	// Create allowed users map (while middleman is STILL UNKNOWN!)
	allowedUsers := make(map[string]*Middleman)
	for _, val := range allowedUsersList {
        allowedUsers[val] = nil
    }

	// Returns the pointer of the new Hub
	return &Hub{
		name: name,
		broadcast: make(chan []byte),
		register: make(chan *Middleman),
		unregister: make(chan *Middleman),
		middlemans: make(map[*Middleman]bool),
		allowedUsers: allowedUsers,
	}
}

func (h *Hub) updateUsers(currentlyAllowedUsers []string) {
	for _, userId := range currentlyAllowedUsers {
		if(!h.checkIfInAllowedUsers(userId)) {
			h.allowedUsers[userId] = nil
		}
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