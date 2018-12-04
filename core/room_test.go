package core

import (
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/suite"

	"testing"

	_ "github.com/mattn/go-sqlite3"
)

type RoomSuite struct {
	suite.Suite
	manager *Manager
}

func (s *RoomSuite) SetupTest() {
	db, err := sqlx.Connect("sqlite3", "")
	if err != nil {
		log.Fatalf("setting up a test database failed: %v", err)
	}
	_, err = db.Exec(Schema())
	if err != nil {
		log.Fatalf("setting up a test database failed: %v", err)
	}

	m := NewManager(db)
	s.manager = m
}

func (suite *RoomSuite) TearDownTest() {
	_ = suite.manager.db.Close()
}

func (suite *RoomSuite) RoomFixture() *Room {
	a := Address{
		Postcode:    "1122AB",
		Street:      "streetlane",
		HouseNumber: 1,
		Floor:       0,
	}

	f := Facilities{
		OwnToilet:        false,
		OwnBathroom:      false,
		SharedLivingRoom: false,
		PersonalSpaces:   1,
	}

	return NewRoom(0, 8, 0, 800.0, true, "", a, f)
}

func (s *RoomSuite) TestNewRoom() {
	r := s.RoomFixture()
	s.Equal(r.UserID, 0)
	s.Equal(r.Size, 8)
	s.Equal(r.FlatMates, 0)
	s.Equal(r.Rent, 800.0)
	s.Equal(r.Hospice, true)
	s.Equal(r.Landlord, "")

	s.Equal(r.Postcode, "1122AB")
	s.Equal(r.Street, "streetlane")
	s.Equal(r.HouseNumber, 1)
	s.Equal(r.Floor, 0)

	s.Equal(r.OwnToilet, false)
	s.Equal(r.OwnBathroom, false)
	s.Equal(r.SharedLivingRoom, false)
	s.Equal(r.PersonalSpaces, 1)
}

func (s *RoomSuite) TestCreateRoom() {
	r := s.RoomFixture()
	err := s.manager.Create(r)
	s.Nil(err)

	updatedR := &Room{}
	err = s.manager.Read(updatedR, r.GetID())
	s.Nil(err)

	s.Equal(updatedR.UserID, 0)
	s.Equal(updatedR.Size, 8)
	s.Equal(updatedR.FlatMates, 0)
	s.Equal(updatedR.Rent, 800.0)
	s.Equal(updatedR.Hospice, true)
	s.Equal(updatedR.Landlord, "")

	s.Equal(updatedR.Postcode, "1122AB")
	s.Equal(updatedR.Street, "streetlane")
	s.Equal(updatedR.HouseNumber, 1)
	s.Equal(updatedR.Floor, 0)

	s.Equal(updatedR.OwnToilet, false)
	s.Equal(updatedR.OwnBathroom, false)
	s.Equal(updatedR.SharedLivingRoom, false)
	s.Equal(updatedR.PersonalSpaces, 1)
}

func (s *RoomSuite) TestUpdateRoom() {
	r := s.RoomFixture()
	err := s.manager.Create(r)
	s.Nil(err)

	r.Size = 10
	r.FlatMates = 3
	r.Rent = 750.05
	r.Hospice = true
	r.Landlord = "landy lord"

	r.Postcode = "9988KL"
	r.Street = "lanedrive"
	r.HouseNumber = 8
	r.Floor = 3

	r.OwnToilet = true
	r.OwnBathroom = true
	r.SharedLivingRoom = true
	r.PersonalSpaces = 3

	err = s.manager.Update(r)
	s.Nil(err)

	// Get the room from the db again
	updatedR := &Room{}
	err = s.manager.Read(updatedR, r.GetID())
	s.Nil(err)
	// UserID cannot be changed.
	s.Equal(updatedR.Size, 10)
	s.Equal(updatedR.FlatMates, 3)
	s.Equal(updatedR.Rent, 750.05)
	s.Equal(updatedR.Hospice, true)
	s.Equal(updatedR.Landlord, "landy lord")

	s.Equal(updatedR.Postcode, "9988KL")
	s.Equal(updatedR.Street, "lanedrive")
	s.Equal(updatedR.HouseNumber, 8)
	s.Equal(updatedR.Floor, 3)

	s.Equal(updatedR.OwnToilet, true)
	s.Equal(updatedR.OwnBathroom, true)
	s.Equal(updatedR.SharedLivingRoom, true)
	s.Equal(updatedR.PersonalSpaces, 3)

}

func TestRoom(t *testing.T) {
	suite.Run(t, new(RoomSuite))
}
