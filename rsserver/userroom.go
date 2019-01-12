package main

import (
	"github.com/gin-gonic/gin"
	"github.com/kevba/swapmyroom/core"
)

func UserRoomRouter(r *gin.RouterGroup, manager *core.Manager) {
	router := r.Group("/user_room")

	router.POST("", dbManager(postUserAndRoom, manager))
}

func postUserAndRoom(c *gin.Context, manager *core.Manager) {
	u := NewUser()
	r := NewRoom()

	type dataStruct struct {
		User UserData `json:"user" binding:"required"`
		Room RoomData `json:"room" binding:"required"`
	}
	data := dataStruct{}

	err := c.ShouldBindJSON(&data)
	if err != nil {
		statuscode, resp := ErrInvalidJSON()
		c.JSON(statuscode, resp)
		return
	}

	u.FromData(data.User)
	err = manager.Create(u)
	if err != nil {
		statuscode, resp := ErrInternalServer()
		c.JSON(statuscode, resp)
		return
	}

	r.FromData(data.Room)
	r.UserID = u.GetID()

	err = manager.Create(r)
	if err != nil {
		statuscode, resp := ErrInternalServer()
		c.JSON(statuscode, resp)
		return
	}

	c.JSON(200, r.ToData())
}
