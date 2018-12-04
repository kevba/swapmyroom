package main

import (
	"roomswap/core"

	"github.com/gin-gonic/gin"
)

type dbEndpoint func(c *gin.Context, manager *core.Manager)

func dbManager(f dbEndpoint, manager *core.Manager) gin.HandlerFunc {
	return func(c *gin.Context) {
		f(c, manager)
	}
}
