package main

import (
	"strconv"

	"github.com/kevba/swapmyroom/core"

	"github.com/gin-gonic/gin"
)

type userEndpoint func(c *gin.Context, manager *core.Manager, u *User)

// userMW gets the user from the Database, or resturns a 404 if no user can be found.
func userMW(f userEndpoint) dbEndpoint {
	return func(c *gin.Context, manager *core.Manager) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			statuscode, resp := ErrNotFound()
			c.JSON(statuscode, resp)
			return
		}

		u := NewUser()
		err = manager.Read(u, id)
		if err != nil {
			statuscode, resp := ErrNotFound()
			c.JSON(statuscode, resp)
			return
		}

		f(c, manager, u)
	}
}

type User struct {
	*core.User
	room []*Room
}

func NewUser() *User {
	return &User{
		User: &core.User{},
	}
}

func (u *User) ToData() UserData {
	return UserData{
		ID:        u.ID,
		Email:     u.Email,
		FirstName: u.FirstName,
		LastName:  u.LastName,
	}
}

func (u *User) FromData(d UserData) {
	u.ID = d.ID
	u.Email = d.Email
	u.FirstName = d.FirstName
	u.LastName = d.LastName
}

type UserData struct {
	ID        int    `json:"id"`
	Email     string `json:"email" binding:"required,email"`
	FirstName string `json:"firstName" binding:"required"`
	LastName  string `json:"lastName" binding:"required"`
}

func UserRouter(r *gin.RouterGroup, manager *core.Manager) {
	router := r.Group("/user")

	router.GET("/:id", dbManager(userMW(getUser), manager))
	router.GET("/:id/rooms", dbManager(userMW(getUserRooms), manager))

	router.POST("/", dbManager(postUser, manager))
	router.POST("/:id/room", dbManager(userMW(postUserRoom), manager))
}

func getUser(c *gin.Context, manager *core.Manager, u *User) {
	c.JSON(200, u.ToData())
}

func getUserRooms(c *gin.Context, manager *core.Manager, u *User) {
	rs, err := manager.FindRoomForUser(u.GetID())
	if err != nil {
		statuscode, resp := ErrInternalServer()
		c.JSON(statuscode, resp)
		return
	}
	c.JSON(200, rs)
}

func postUser(c *gin.Context, manager *core.Manager) {
	u := NewUser()
	var data UserData
	err := c.ShouldBindJSON(&data)
	if err != nil {
		statuscode, resp := ErrInvalidJSON()
		c.JSON(statuscode, resp)
		return
	}

	u.FromData(data)
	err = manager.Create(u)
	if err != nil {
		statuscode, resp := ErrInternalServer()
		c.JSON(statuscode, resp)
		return
	}
	c.JSON(200, u.ToData())
}

func postUserRoom(c *gin.Context, manager *core.Manager, u *User) {
	r := NewRoom()
	var data RoomData
	err := c.ShouldBindJSON(&data)
	if err != nil {
		statuscode, resp := ErrInvalidJSON()
		c.JSON(statuscode, resp)
		return
	}

	r.FromData(data)
	r.UserID = u.GetID()

	err = manager.Create(r)
	if err != nil {
		statuscode, resp := ErrInternalServer()
		c.JSON(statuscode, resp)
		return
	}

	c.JSON(200, r.ToData())
}
