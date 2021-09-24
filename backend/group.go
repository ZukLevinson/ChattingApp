package main

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"strconv"

	"net/http"
)

/*
Group represents the group model in the database
*/
type Group struct {
	GroupId          int `json:"groupId"`
	GroupName        string `json:"groupName"`
	GroupDescription string `json:"groupDescription,omitempty"`
	CreatorId        int `json:"creatorId"`
	Users *[]UserInGroup `json:"users,omitempty"`
}

/*
User represents the user model in the database
*/
type User struct {
	UserId int `json:"userId"`
}

/*
UserInGroup represents the users that are associated with group in the database.
Each UserInGroup includes the RoleId which represents the role of the user inside the group - also an database model.
*/
type UserInGroup struct {
	UserId          int `json:"userId"`
	GroupId          int `json:"groupId"`
	RoleId          int `json:"roleId"`
}

const api = "http://localhost:5000"

// Gets the group with the groupId in the database, and creates an structure of it
func createGroupInstance(groupId int) (*Group, error) {
	resp, err := http.Get(api + "/groups/" + strconv.Itoa(groupId))

	if err != nil {
		log.Panic(err)
	}

	defer resp.Body.Close()

	var group Group
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		log.Panic(err)
	}

	err = json.Unmarshal(body, &group)

	if err != nil {
		log.Panicln("Error in parsing Group - ", err.Error())

		return nil, errors.New("Error in parsing Group")
	}

	return &group, nil
}

func (group *Group) getUsersInGroup() (*[]UserInGroup, error) {
	resp, err := http.Get(api + "/groups/" + strconv.Itoa(group.GroupId) + "/users")

	if err != nil {
		log.Panic(err)
	}

	defer resp.Body.Close()

	var users []UserInGroup
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		log.Panic(err)
	}

	err = json.Unmarshal(body, &users)

	if err != nil {
		log.Panicln("Error in parsing UserInGroup - ", err.Error())

		return nil, errors.New("Error in parsing UserInGroup")
	}

	group.Users = &users

	return &users, nil
}