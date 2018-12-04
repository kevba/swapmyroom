package core

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
)

// User represents someone williong to swap a room for another room.
type User struct {
	ID            int    `db:"id"`
	Email         string `db:"email"`
	FirstName     string `db:"first_name"`
	LastName      string `db:"last_name"`
	PreferencesID int    `db:"pref_id"`
}

func NewUser(email, firstName, lastName string) *User {
	return &User{
		Email:     email,
		FirstName: firstName,
		LastName:  lastName,
	}
}

func (u *User) GetID() int {
	return u.ID
}

// Create returns a sql query needed to instert this user into the database.
func (u *User) Create(db *sqlx.DB) (sql.Result, error) {
	stmt := `
        INSERT INTO user (email, first_name, last_name, pref_id)
        VALUES (:email, :first_name, :last_name, :pref_id);
    `
	return db.NamedExec(stmt, u)
}

// Update returns a sql query needed to update this user into the database.
func (u *User) Update(db *sqlx.DB) (sql.Result, error) {
	stmt := `
        UPDATE user
        SET email = :email,
            first_name = :first_name,
            last_name = :last_name,
            pref_id = :pref_id
        WHERE id = :id
    `
	return db.NamedExec(stmt, u)
}

// Read populates this struct with the properties found in the database, based on ID.
func (u *User) Read(db *sqlx.DB, id int) error {
	stmt := "SELECT * FROM user WHERE id = ?"
	return db.Get(u, stmt, id)
}

// DeleteStatement returns a sql query needed to remove this user from the database.
func (u *User) Delete(db *sqlx.DB) string {
	return ""
}

// Find ...
func (u *User) Find(db *sqlx.DB, d []CRUDable, field, value string) error {
	stmt := "SELECT * FROM user WHERE ? = ?"
	var rooms []*Room
	err := db.Get(&rooms, stmt, field, value)
	if err != nil {
		return err
	}
	for _, r := range rooms {
		d = append(d, r)
	}
	return nil
}

func getUserSchema() string {
	return `
        CREATE TABLE user (
            id          integer PRIMARY KEY,
            email       text,
            first_name       text,
            last_name       text,
            pref_id     integer,

            FOREIGN KEY (pref_id) REFERENCES preferences(id) ON DELETE CASCADE
        );
    `
}
