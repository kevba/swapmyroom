package core

import (
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/suite"

	"testing"

	_ "github.com/mattn/go-sqlite3"
)

type UserSuite struct {
	suite.Suite
	manager *Manager
}

func (s *UserSuite) SetupTest() {
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

func (suite *UserSuite) TearDownTest() {
	_ = suite.manager.db.Close()
}

func (s *UserSuite) TestNewUser() {
	testMail := "test@test.com"
	testFirstName := "jan"
	testLastName := "jansen"

	u := NewUser(testMail, testFirstName, testLastName)
	s.Equal(u.Email, testMail)
	s.Equal(u.FirstName, testFirstName)
	s.Equal(u.LastName, testLastName)
}

func (s *UserSuite) TestCreateUser() {
	testMail := "test@test.com"
	testFirstName := "jan"
	testLastName := "jansen"

	u := NewUser(testMail, testFirstName, testLastName)

	err := s.manager.Create(u)
	s.Nil(err)
	s.Equal(u.ID, 1)
	s.Equal(u.Email, testMail)
	s.Equal(u.FirstName, testFirstName)
	s.Equal(u.LastName, testLastName)
}

func (s *UserSuite) TestUpdateUser() {
	testMail := "test@test.com"
	testFirstName := "jan"
	testLastName := "jansen"

	u := NewUser(testMail, testFirstName, testLastName)
	err := s.manager.Create(u)
	s.Nil(err)

	tests := []struct {
		mail  string
		fname string
		lname string
	}{
		{"test2@test.com", "john", "johnson"},
		{"aaaa@test.com", "17", ""},
	}

	for _, test := range tests {
		u.Email = test.mail
		u.FirstName = test.fname
		u.LastName = test.lname
		err = s.manager.Update(u)
		s.Nil(err)

		s.Equal(u.ID, 1)
		s.Equal(u.Email, test.mail)
		s.Equal(u.FirstName, test.fname)
		s.Equal(u.LastName, test.lname)
	}
}

func TestUser(t *testing.T) {
	suite.Run(t, new(UserSuite))
}
