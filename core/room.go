package core

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
)

type Address struct {
	Postcode    string `db:"postcode"`
	Street      string `db:"street"`
	HouseNumber int    `db:"house_number"`
	Floor       int    `db:"floor"`
}

type Facilities struct {
	// Facilities
	OwnToilet        bool `db:"toilet"`
	OwnBathroom      bool `db:"bathroom"`
	SharedLivingRoom bool `db:"shared_living"`
	PersonalSpaces   int  `db:"personal_spaces"`
}

// Room represents a room that someone wants swapped.
type Room struct {
	ID        int     `db:"id"`
	UserID    int     `db:"user_id"`
	Size      int     `db:"size"`
	FlatMates int     `db:"flatmates"`
	Rent      float64 `db:"rent"`
	// Pictures is a list of paths to the actual pictures.
	Pictures []string `db:"pictures"`
	Hospice  bool     `db:"hospice"`
	Landlord string   `db:"landlord"`

	Address
	Facilities
}

func NewRoom(userID, size, flatmates int, rent float64, Hospice bool,
	Landlord string, address Address, facilities Facilities) *Room {
	return &Room{
		Size:       size,
		UserID:     userID,
		FlatMates:  flatmates,
		Rent:       rent,
		Hospice:    Hospice,
		Landlord:   Landlord,
		Address:    address,
		Facilities: facilities,
	}
}

func (r *Room) GetID() int {
	return r.ID
}

// Create returns a sql query needed to instert this user into the database.
func (r *Room) Create(db *sqlx.DB) (sql.Result, error) {
	stmt := `
        INSERT INTO room (
            user_id, size, flatmates, rent, hospice, landlord,
            postcode, street, house_number, floor,
            toilet, bathroom, shared_living, personal_spaces
        )
        VALUES (
            :user_id, :size, :flatmates, :rent, :hospice, :landlord,
            :postcode, :street, :house_number, :floor,
            :toilet, :bathroom, :shared_living, :personal_spaces
        );
    `
	return db.NamedExec(stmt, r)
}

// Update returns a sql query needed to update this user into the database.
func (r *Room) Update(db *sqlx.DB) (sql.Result, error) {
	stmt := `
        UPDATE room
        SET size = :size,
            flatmates = :flatmates,
            rent = :rent,
            hospice = :hospice,
            landlord = :landlord,

            postcode = :postcode,
            street = :street,
            house_number = :house_number,
            floor = :floor,

            toilet = :toilet,
            bathroom = :bathroom,
            shared_living = :shared_living,
            personal_spaces = :personal_spaces
        WHERE id = :id
    `
	return db.NamedExec(stmt, r)
}

// Read populates this struct with the properties found in the database, based on ID.
func (r *Room) Read(db *sqlx.DB, id int) error {
	stmt := "SELECT * FROM room WHERE id = ?"
	return db.Get(r, stmt, id)
}

// Delete returns a sql query needed to remove this user from the database.
func (r *Room) Delete(db *sqlx.DB) string {
	return ""
}

// Find ...
func (m *Manager) FindRoomForUser(userID int) ([]*Room, error) {
	stmt := "SELECT * FROM room WHERE user_id = ?"
	var rooms []*Room
	err := m.db.Select(&rooms, stmt, userID)
	if err != nil {
		return rooms, err
	}
	return rooms, nil
}

func getRoomSchema() string {
	return `
        CREATE TABLE room (
            id              integer PRIMARY KEY,
            user_id         integer,
            size            integer,
            flatmates       integer,
            rent            float,
            hospice         integer,
            landlord        string,

            postcode        real,
            street          string,
            house_number    integer,
            floor           integer,

            toilet boolean  integer,
            bathroom        integer,
            shared_living   integer,
            personal_spaces integer,

            FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
        );
    `
}
