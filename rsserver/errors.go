package main

const ErrNotFoundMsg = "page not found"

func ErrNotFound() (int, map[string]interface{}) {
	return 404, map[string]interface{}{
		"error": ErrNotFoundMsg,
	}
}

const ErrInternalServerMsg = "something went wrong"

func ErrInternalServer() (int, map[string]interface{}) {
	return 500, map[string]interface{}{
		"error": ErrInternalServerMsg,
	}
}

const ErrInvalidJSONMsg = "the given parameters are invalid"

func ErrInvalidJSON() (int, map[string]interface{}) {
	resp := map[string]interface{}{
		"error": ErrInvalidJSONMsg,
	}
	return 422, resp
}
