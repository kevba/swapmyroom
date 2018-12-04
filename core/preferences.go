package core

// Preferences represents the preferences the user has for their new room.
type Preferences struct {
	MinSize    uint
	MaxSize    uint
	HouseMates int
	MinRent    int
	MaxRent    int
	Facilities
}

func getPreferencesSchema() string {
	return `
        CREATE TABLE preferences (
            id          integer PRIMARY KEY,
            min_size    integer,
            max_size    integer,
            min_rent    float,
            max_rent    float
        );
    `
}
