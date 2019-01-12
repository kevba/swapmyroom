package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/kevba/swapmyroom/core"
	"github.com/stretchr/testify/suite"
)

type UserRoomSuite struct {
	suite.Suite
	manager *core.Manager
	router  *gin.Engine
}

func (s *UserRoomSuite) SetupTest() {
	db, err := sqlx.Connect("sqlite3", "")
	if err != nil {
		log.Fatalf("setting up a test database failed: %v", err)
	}
	_, err = db.Exec(core.Schema())
	if err != nil {
		log.Fatalf("setting up a test database failed: %v", err)
	}

	m := core.NewManager(db)
	s.manager = m

	gin.SetMode(gin.ReleaseMode)
	s.router = gin.New()
	UserRoomRouter(s.router.Group(""), m)
}

func (s *UserRoomSuite) TearDownTest() {
	_ = s.manager.DB().Close()
}

func (s *UserRoomSuite) RoomFixture() Room {
	a := core.Address{
		Postcode:    "1122AB",
		Street:      "streetlane",
		HouseNumber: 1,
		Floor:       0,
	}

	f := core.Facilities{
		OwnToilet:        false,
		OwnBathroom:      false,
		SharedLivingRoom: false,
		PersonalSpaces:   1,
	}

	r := Room{
		core.NewRoom(0, 8, 0, 800.0, true, "", a, f),
	}

	err := s.manager.Create(r)
	if err != nil {
		log.Fatalf("could not create room fixture: %v", err)
	}

	return r
}

//
func (s *UserRoomSuite) UserFixture() User {
	u := User{
		core.NewUser("jan@test.com", "jan", "jansen"),
		[]*Room{},
	}

	err := s.manager.Create(u)
	if err != nil {
		log.Fatalf("could not create user fixture: %v", err)
	}

	return u
}

func (s *UserRoomSuite) TestPostUserAndRoom() {
	tests := []struct {
		rdata      RoomData
		udata      UserData
		statusCode int
	}{
		{
			RoomData{0, 0, 10, 1, 900.0, false, "", "1122ab", "lanelane", 3, 1, false, false, true, 1},
			UserData{0, "jan@test.com", "jan", "jansen"},
			200,
		},
		{
			RoomData{0, 0, 10, 1, 900.0, false, "", "", "lanelane", 3, 1, false, false, true, 1},
			UserData{0, "jan@test.com", "jan", "jansen"},
			422,
		},
		{
			RoomData{0, 0, 10, 1, 900.0, false, "", "1122ab", "", 3, 1, false, false, true, 1},
			UserData{0, "jan@test.com", "jan", "jansen"},
			422,
		},
		{
			RoomData{0, 0, 10, 1, 0, false, "", "1122ab", "", 3, 1, false, false, true, 1},
			UserData{0, "jan@test.com", "jan", "jansen"},
			422,
		},
		{
			RoomData{},
			UserData{0, "jan@test.com", "jan", "jansen"},
			404,
		},
	}

	for _, test := range tests {
		reqData, _ := json.Marshal(map[string]interface{}{
			"room": test.rdata,
			"user": test.udata,
		})

		req, _ := http.NewRequest("POST", "/user_room", bytes.NewReader(reqData))
		w := httptest.NewRecorder()
		s.router.ServeHTTP(w, req)

		s.Equal(test.statusCode, w.Code)
		if w.Code == 200 {
			type dataStruct struct {
				User UserData `json:"user" binding:"required"`
				Room RoomData `json:"room" binding:"required"`
			}
			resData := dataStruct{}
			err := json.Unmarshal(w.Body.Bytes(), resData)
			s.Nil(err, fmt.Sprintf("could not unmarshal response: %v", err))

			s.NotEqual(0, resData.User.ID)
			s.Equal(test.udata.Email, resData.User.Email)
			s.Equal(test.udata.FirstName, resData.User.FirstName)
			s.Equal(test.udata.LastName, resData.User.LastName)

			s.NotEqual(0, resData.Room.ID)

			s.Equal(test.rdata.ID, resData.Room.ID)
			s.Equal(test.rdata.UserID, resData.Room.UserID)
			s.Equal(test.rdata.Size, resData.Room.Size)
			s.Equal(test.rdata.FlatMates, resData.Room.FlatMates)
			s.Equal(test.rdata.Rent, resData.Room.Rent)
			s.Equal(test.rdata.Hospice, resData.Room.Hospice)
			s.Equal(test.rdata.Landlord, resData.Room.Landlord)
			s.Equal(test.rdata.Postcode, resData.Room.Postcode)
			s.Equal(test.rdata.Street, resData.Room.Street)
			s.Equal(test.rdata.HouseNumber, resData.Room.HouseNumber)
			s.Equal(test.rdata.Floor, resData.Room.Floor)
			s.Equal(test.rdata.OwnToilet, resData.Room.OwnToilet)
			s.Equal(test.rdata.OwnBathroom, resData.Room.OwnBathroom)
			s.Equal(test.rdata.SharedLivingRoom, resData.Room.SharedLivingRoom)
			s.Equal(test.rdata.PersonalSpaces, resData.Room.PersonalSpaces)

		}
	}
}

func TestUserRoom(t *testing.T) {
	suite.Run(t, new(UserRoomSuite))
}
