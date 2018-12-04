package main

import (
	"roomswap/core"
	"strconv"

	"github.com/gin-gonic/gin"
)

type RoomData struct {
	ID        int     `json:"id"`
	UserID    int     `json:"userID"`
	Size      int     `json:"size"  binding:"required"`
	FlatMates int     `json:"flatmates"  binding:"required"`
	Rent      float64 `json:"rent"  binding:"required"`

	Hospice  bool   `json:"hospice"  binding:"exists"`
	Landlord string `json:"landlord"`

	Postcode    string `json:"postcode"  binding:"required"`
	Street      string `json:"street"  binding:"required"`
	HouseNumber int    `json:"houseNumber"  binding:"required"`
	Floor       int    `json:"floor"  binding:"required"`

	OwnToilet        bool `json:"toilet"  binding:"exists"`
	OwnBathroom      bool `json:"bathroom"  binding:"exists"`
	SharedLivingRoom bool `json:"sharedLiving"  binding:"exists"`
	PersonalSpaces   int  `json:"personalSpaces"  binding:"required"`
}

type Room struct {
	*core.Room
}

func NewRoom() *Room {
	return &Room{
		&core.Room{},
	}
}

func (r *Room) ToData() RoomData {
	return RoomData{
		ID:               r.ID,
		UserID:           r.UserID,
		Size:             r.Size,
		FlatMates:        r.FlatMates,
		Rent:             r.Rent,
		Hospice:          r.Hospice,
		Landlord:         r.Landlord,
		Postcode:         r.Postcode,
		Street:           r.Street,
		HouseNumber:      r.HouseNumber,
		Floor:            r.Floor,
		OwnToilet:        r.OwnToilet,
		OwnBathroom:      r.OwnBathroom,
		SharedLivingRoom: r.SharedLivingRoom,
		PersonalSpaces:   r.PersonalSpaces,
	}
}

func (r *Room) FromData(d RoomData) {
	r.ID = d.ID
	r.UserID = d.UserID
	r.Size = d.Size
	r.FlatMates = d.FlatMates
	r.Rent = d.Rent
	r.Hospice = d.Hospice
	r.Landlord = d.Landlord
	r.Postcode = d.Postcode
	r.Street = d.Street
	r.HouseNumber = d.HouseNumber
	r.Floor = d.Floor
	r.OwnToilet = d.OwnToilet
	r.OwnBathroom = d.OwnBathroom
	r.SharedLivingRoom = d.SharedLivingRoom
	r.PersonalSpaces = d.PersonalSpaces
}

func RoomRouter(r *gin.Engine, manager *core.Manager) {
	router := r.Group("/room")

	router.GET("/:id", dbManager(getRoom, manager))
	router.POST("/", dbManager(postRoom, manager))
}

func getRoom(c *gin.Context, manager *core.Manager) {
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
	c.JSON(200, u.ToData())
}

func postRoom(c *gin.Context, manager *core.Manager) {
	r := NewRoom()
	var data RoomData
	c.BindJSON(&data)

	r.FromData(data)
	err := manager.Create(r)
	if err != nil {
		statuscode, resp := ErrNotFound()
		c.JSON(statuscode, resp)
		return
	}
	c.JSON(200, r.ToData())
}
