package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"roomswap/core"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/suite"
)

type UserSuite struct {
	suite.Suite
	manager *core.Manager
	router  *gin.Engine
}

func (s *UserSuite) SetupTest() {
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
	UserRouter(s.router, m)
}

func (suite *UserSuite) TearDownTest() {
	_ = suite.manager.DB().Close()
}

func (s *UserSuite) RoomFixture() Room {
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
func (s *UserSuite) UserFixture() User {
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

func (s *UserSuite) TestPostUser() {
	tests := []struct {
		data       UserData
		statusCode int
	}{
		{UserData{0, "jan@test.com", "jan", "jansen"}, 200},
		{UserData{0, "john@test.com", "john", "johnsen"}, 200},
		{UserData{0, "john@test.com", "john", ""}, 422},
		{UserData{0, "john@test.com", "", "johnsen"}, 422},
		{UserData{0, "", "john", "johnsen"}, 422},
		{UserData{}, 422},
	}

	for _, test := range tests {
		reqData, _ := json.Marshal(test.data)
		req, _ := http.NewRequest("POST", "/user/", bytes.NewReader(reqData))
		w := httptest.NewRecorder()
		s.router.ServeHTTP(w, req)

		s.Equal(test.statusCode, w.Code)
		if w.Code == 200 {
			resData := &UserData{}

			err := json.Unmarshal(w.Body.Bytes(), resData)
			s.Nil(err, fmt.Sprintf("could not unmarshal response: %v", err))
			s.NotEqual(0, resData.ID)
			s.Equal(test.data.Email, resData.Email)
			s.Equal(test.data.FirstName, resData.FirstName)
			s.Equal(test.data.LastName, resData.LastName)
		}
	}
}

func (s *UserSuite) TestPostUserWrongFormat() {
	reqData := []byte("what, this is no JSON!")
	req, _ := http.NewRequest("POST", "/user/", bytes.NewReader(reqData))
	w := httptest.NewRecorder()
	s.router.ServeHTTP(w, req)

	statusCode, msg := ErrInvalidJSON()
	s.Equal(statusCode, w.Code)

	errResp := map[string]interface{}{}
	err := json.Unmarshal(w.Body.Bytes(), &errResp)
	s.Nil(err, fmt.Sprintf("could not unmarshal response: %v", err))
	s.Equal(msg["error"], errResp["error"])
}

func (s *UserSuite) TestPostUserRoom() {
	u := s.UserFixture()
	tests := []struct {
		data       RoomData
		userID     int
		statusCode int
	}{
		{
			RoomData{0, 0, 10, 1, 900.0, false, "", "1122ab", "lanelane", 3, 1, false, false, true, 1},
			u.GetID(),
			200,
		},
		{
			RoomData{0, 0, 10, 1, 900.0, false, "", "", "lanelane", 3, 1, false, false, true, 1},
			u.GetID(),
			422,
		},
		{
			RoomData{0, 0, 10, 1, 900.0, false, "", "1122ab", "", 3, 1, false, false, true, 1},
			u.GetID(),
			422,
		},
		{
			RoomData{0, 0, 10, 1, 0, false, "", "1122ab", "", 3, 1, false, false, true, 1},
			u.GetID(),
			422,
		},
		{
			RoomData{},
			999,
			404,
		},
	}

	for _, test := range tests {
		reqData, _ := json.Marshal(test.data)
		req, _ := http.NewRequest("POST", fmt.Sprintf("/user/%v/room", test.userID), bytes.NewReader(reqData))
		w := httptest.NewRecorder()
		s.router.ServeHTTP(w, req)

		s.Equal(test.statusCode, w.Code)
		if w.Code == 200 {
			resData := &RoomData{}

			err := json.Unmarshal(w.Body.Bytes(), resData)
			s.Nil(err, fmt.Sprintf("could not unmarshal response: %v", err))
			s.NotEqual(0, resData.ID)
		}
	}
}

func TestUser(t *testing.T) {
	suite.Run(t, new(UserSuite))
}
