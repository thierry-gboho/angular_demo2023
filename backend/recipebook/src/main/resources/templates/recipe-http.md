# find all users

```
curl -H "Content-Type: application/json" -X GET http://localhost:8080/users && echo
```

Result:
```
[{"localId":"1","email":"admin@gmail.com","roles":["admin","user"]},{"localId":"2","email":"user@gmail.com","roles":["user"]},{"localId":"3","email":"admin2@gmail.com","roles":["admin","user"]},{"localId":"4","email":"user2@gmail.com","roles":["user"]},{"localId":"5","email":"user3@gmail.com","roles":["user"]},{"localId":"6","email":"user4@gmail.com","roles":["user"]}]
```

# sign up

## request body

| property name           | type     |  description                                                      |
| :---------------------  | :------  | :---------------------------------------------------------------  |
| email                   | string   | The email for the user to create                                  |
| password                | string   | The password for the user to create                               |
| returnSecureToken       | boolean  | whether to return an ID and refresh token. should always be true  |

## Response payload

| property name           | type     |  description                                                      |
| :---------------------  | :------  | :---------------------------------------------------------------  |
| kind                    | string   | The request type, always "identitytoolkit#SignupNewUserResponse"  |
| idToken                 | string   | A Auth ID Token for the newly created muser                       |
| email                   | string   | The email for the newly created user                              |
| refreshToken            | string   | The Auth refresh token for the newly created user                 |
| expiresIn               | string   | The number of seconds in which the ID token expires               |
| localId                 | string   | The uid of the newly created user                                 |

## Example:

```
curl -d '{ "email": "test@yahoo.com", "password": "pwd"}' -H "Content-Type: application/json" -X POST http://localhost:8080/signup && echo
```

Response:

```
{"kind":"identitytoolkit#SignupNewUserResponse",
"idToken":"not_used",
"email":"test@yahoo.com",
"refreshToken":"not_used",
"expiresIn":"not_used",
"localId":"7"}
```

# Login

```
curl -d '{ "email": "admin@gmail.com", "password": "password"}' -H "Content-Type: application/json" -X POST http://localhost:8080/connexion && echo
```

Response:
```
{"kind":"identitytoolkit#SignupNewUserResponse",
"idToken":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX2FkbWluIiwiUk9MRV91c2VyIl0sImlhdCI6MTc1MTM0ODUwOSwiZXhwIjoxNzUxMzUyMTA5fQ.APaRMHPLZh8a13IROxcQByyh9vQ9203vTURpxqECaaI",
"email":"admin@gmail.com",
"refreshToken":"not_used",
"expiresIn":"not_used",
"localId":"1",
"registered":true}
```

# save recipes

```
curl -d '[{"name": "new Recipe", "description": "new description", "imagePath": "http/path/image.jpg", "ingredients": [ { "name": "carrot", "amount": 45}, {"name": "onion", "amount": 54} ] } ]' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX2FkbWluIiwiUk9MRV91c2VyIl0sImlhdCI6MTc1MDAxMTE1MiwiZXhwIjoxNzUwMDE0NzUyfQ.vo6KuGPUsat14YnydGls3l3fsEf5uYFExdZevvbc6V8" -X POST http://localhost:8080/recipes && echo
```

# fetch data

```
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX2FkbWluIiwiUk9MRV91c2VyIl0sImlhdCI6MTc1MDAxMTE1MiwiZXhwIjoxNzUwMDE0NzUyfQ.vo6KuGPUsat14YnydGls3l3fsEf5uYFExdZevvbc6V8" -X GET http://localhost:8080/recipes && echo
```

