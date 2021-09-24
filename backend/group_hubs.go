package main

import "log"

/*
This model is intended to keep a record of all the hubs that are active, and if a requested hub is missing - creates it!
*/
type GroupsHub struct {
	hubs map[int] *Hub // The int represents the groupId (each group has its corresponding hub)
}

func createHubber() *GroupsHub {
	return &GroupsHub{
		hubs: make(map[int]*Hub),
	}
}

func (hubber *GroupsHub) recordNewHub(hubId int, hub *Hub) {
	hubber.hubs[hubId] = hub
	log.Printf("Recorded new Hub with id of %d", hubId)
}

func (hubber *GroupsHub) getHub(hubId int) *Hub {
	return hubber.hubs[hubId]
}