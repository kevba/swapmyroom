package main

import (
	"flag"
	"fmt"
	"log"
	"roomswap/core"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	port := flag.Int("port", 9966, "port to start the http server")
	path := flag.String("db", "test.db", "Path to the place where the database should be generated")
	debug := flag.Bool("v", false, "enables more logs")
	flag.Parse()

	if !*debug {
		gin.SetMode(gin.ReleaseMode)
	}

	db, err := sqlx.Connect("sqlite3", *path)
	if err != nil {
		log.Fatalf("could not connect to database: %v", err)
	}
	m := core.NewManager(db)
	router := gin.Default()
	UserRouter(router, m)
	RoomRouter(router, m)

	router.Run(fmt.Sprintf(":%v", *port))
}
