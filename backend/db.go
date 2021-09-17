package main

import (
	"encoding/json"
	"errors"
	"io"
	"log"
	"strconv"

	// "io"
	"net/http"
)

type PostgresAPI struct {
	host string
}

type Group struct {
	GroupId          int `json:"groupId"`
	GroupName        string `json:"groupName"`
	GroupDescription string `json:"groupDescription,omitempty"`
	CreatorId        int `json:"creatorId"`
}

type UserInGroup struct {
	UserId          int `json:"userId"`
	GroupId          int `json:"groupId"`
	RoleId          int `json:"roleId"`
}

func createPostgresAPIInstance() *PostgresAPI {
	return &PostgresAPI{host: "http://localhost:5000"}
}

func (api *PostgresAPI) findGroup(groupId int) (*Group, error) {
	resp, err := http.Get(api.host + "/groups/" + strconv.Itoa(groupId))

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
		log.Panic("Error in parsing")

		return nil, errors.New("Error in parsing")
	}

	return &group, nil
}

func (api *PostgresAPI) getGroupUserRoles(groupId int) (*[]UserInGroup, error) {
	resp, err := http.Get(api.host + "/groups/" + strconv.Itoa(groupId) + "/users")

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
		log.Panic("Error in parsing")

		return nil, errors.New("Error in parsing")
	}

	return &users, nil
}