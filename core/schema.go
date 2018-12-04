package core

import "bytes"

func Schema() string {
	b := bytes.Buffer{}
	b.WriteString(getUserSchema())
	b.WriteString(getRoomSchema())
	b.WriteString(getPreferencesSchema())

	return b.String()
}
