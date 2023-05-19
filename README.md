# messenger-app

The messenger-app is an API has these routes

'/user' => (GET) get all users details

'/user/:id' => (GET) get specific user detail

'/user/create' => (POST) create new user

'/user/update/:id' => (PUT) update specific user info

'/user/remove/:id' => (DELETE) delete specific user

'/room' => (GET) get all rooms details

'/room/:id' => (GET) get specific room detail

'/room/create' => (POST) create new room

'/room/update/:id' => (PUT) update specific room info

'/room/remove/:id' => (DELETE) delete specific room

Note: add 'DB_CONNECTION_STR' variable to environment variables to connect db