package main

import (
	"fmt"
	"log"
	"roomswap/core"

	"github.com/jmoiron/sqlx"
)

func populateDB(db *sqlx.DB) {
	m := core.NewManager(db)

	for i := 0; i < 1000; i++ {
		mail := fmt.Sprintf("test%v@test.com", i)
		u := core.NewUser(mail)
		err := m.Create(u)
		if err != nil {
			log.Printf("Failed to insert user: %v", err)
		}

		r := core.NewRoom(u.ID, 10, 1, 900.80, "1122AB", "lanestreet", i)
		err = m.Create(r)
		if err != nil {
			log.Printf("Failed to insert room: %v", err)
		}
	}
}
