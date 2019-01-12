package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/kevba/swapmyroom/core"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	path := flag.String("db", "test.db", "Path to the place where the database should be generated")
	g := flag.Bool("g", false, "generate example data")
	flag.Parse()

	if err := setupDB(*path); err != nil {
		log.Fatalln(err)
	}

	if *g {
		db, _ := sqlx.Connect("sqlite3", *path)
		populateDB(db)
	}
}

func setupDB(path string) (err error) {
	defer func() {
		if err != nil {
			err = fmt.Errorf("could not create database: %v", err)
		}
	}()

	db, err := sqlx.Connect("sqlite3", path)
	if err != nil {
		return err
	}

	defer db.Close()

	_, err = db.Exec(core.Schema())
	if err != nil {
		return err
	}

	return nil
}
