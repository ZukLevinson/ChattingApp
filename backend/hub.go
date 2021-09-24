package main

import (
	"errors"
	"fmt"
	"log"
)

// The hub maintains the different channels while keeping records of the middlemans
type Hub struct {
	name string // Hub name
	middlemans map[*Middleman]bool // Map defining active middlemans in the hub
	broadcast chan []byte // Channel for broadcasting messages at the hub (incoming messages)
	register chan *Middleman // Channel for incoming registered middleman's requests
	unregister chan *Middleman // Channel for incoming unregistered middleman's requests
	group *Group // The group that the hub represents
}

// Lists all the allowed usersId(s) in the hub
func (h *Hub) listAllowedUsers() ([]int, error) {
	allowedUsersInGroup, err := h.group.getUsersInGroup()

	if(err != nil) {
		log.Printf("Cannot list allowed users in group %d - %v", h.group.GroupId, err)
		return nil, errors.New("cannot list allowed users in group")
	}

	keys := make([]int, 0, len(*allowedUsersInGroup))

    for _, val := range *allowedUsersInGroup {
        keys = append(keys, val.UserId)
    }
	
	return keys, nil
}

func (h *Hub) checkIfInAllowedUsers(userId int) (bool, error) {
	allowedUsersList, err := h.listAllowedUsers()

	if(err != nil){
		return false, err
	}
	
    for _, val := range allowedUsersList {
		log.Println("Checking user - ", val)
        if (val == userId) {
			log.Printf("User %v is valid", userId)

			return true, nil
		}
    }
	
	return false, nil
}

// Checks whether middleman is allowed to access the hub, and if so - registering it
func (h *Hub) registerMiddleman(middleman *Middleman) error {
	res, err := h.checkIfInAllowedUsers(middleman.user.UserId)

	if(res){
		h.register<-middleman
		log.Println("Registered middleman to Hub with the name - ", h.name)

		return nil
	} else {
		if(err != nil) {
			apiErrorMessage := fmt.Sprintf("Could not register middleman - %v", err)
			return errors.New(apiErrorMessage)
		} else {
			forbiddenUserErrorMessage := fmt.Sprintf("Middleman with userId %v not allowed!", middleman.user.UserId)
			return errors.New(forbiddenUserErrorMessage)
		}

	} 
}

// Creates new Hub
func createHub(groupId int) (*Hub, error) {
	group, err := createGroupInstance(groupId)

	if(err != nil) {
		return nil, errors.New(err.Error())
	}

	return &Hub{
		broadcast: make(chan []byte),
		register: make(chan *Middleman),
		unregister: make(chan *Middleman),
		middlemans: make(map[*Middleman]bool),
		group: group,
	}, nil
}

func (h *Hub) initiateHub() {
	for {
		select {
			// Incoming middleman to register
			case middleman := <-h.register:
				log.Println("Incoming registered middleman")
				h.middlemans[middleman] = true

			// Incoming middleman to unregister
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
						case middleman.send <- message: // If the middleman's channel is active, send the message
							log.Printf("Spreaded the message %v", message)
						default: // If could not send the message, validate the unregistration process
							middleman.unregister(h)
					}
				}
		}
	}
}