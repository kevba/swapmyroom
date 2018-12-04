package core

import (
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type CRUDable interface {
	Create(db *sqlx.DB) (sql.Result, error)
	Read(db *sqlx.DB, id int) error
	Update(db *sqlx.DB) (sql.Result, error)
	Delete(db *sqlx.DB) string
	GetID() int
}

type Manager struct {
	db *sqlx.DB
}

func NewManager(db *sqlx.DB) *Manager {
	return &Manager{db: db}
}

func (m *Manager) Create(i CRUDable) error {
	res, err := i.Create(m.db)
	if err != nil {
		return fmt.Errorf("failed to execute create statement for %T: %v", i, err)
	}
	// Get the ID of the inserted thing
	id, err := res.LastInsertId()
	if err != nil {
		return fmt.Errorf("failed to get last inserted id: %v", err)
	}

	// Read the thing back, this ensures the thing we have is the same as the one inserted.
	// This mostly means the ID gets set in the passed CRUDable.
	return m.Read(i, int(id))
}

func (m *Manager) Read(i CRUDable, id int) error {
	err := i.Read(m.db, id)
	if err != nil {
		return fmt.Errorf("failed to read %T with id %v: %v", i, id, err)
	}
	return nil
}

func (m *Manager) Update(i CRUDable) error {
	_, err := i.Update(m.db)
	if err != nil {
		return fmt.Errorf("failed to update %T with id %v: %v", i, i.GetID(), err)
	}
	return m.Read(i, i.GetID())
}

func (m *Manager) DB() *sqlx.DB {
	return m.db
}
