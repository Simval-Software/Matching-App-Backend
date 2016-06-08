# Matching-App-Backend

var user = {
    _id,
    email,
    firstName,
    lastName,
    gender,
    country,
    city,
    matches,
    likedUsers,
    likedByUsers,
    questionaries,
    messages,
    dateOfBirth,
    images,
    profileImage,
    zodiac,
    salt,
    passwordHash,
    lastLoggedIn
}

# API #
Form Content Type - application/x-www-form-urlencoded

* Login - /api/login

request body
{
    email,
    password
}

response body
{
    gender: String,
    dateOfBirth: Number,
    zodiac: Number,
    country: String,
    city: String,
    profileImage: String,
    firstName: String,
    lastName: String,
    "popularity": 0,
    "visits": 0,
    "_id": "5757d9b572ff19f833594e3c",
    "email": "valeri23@abv.bg",
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzU3ZDliNTcyZmYxOWY4MzM1OTRlM2MiLCJpYXQiOjE0NjUzNzUxNTgsImV4cCI6MTQ2NTQ2MTU1OH0.0iRiURI9V8oRgVl6Ao1XEC0VrkpFkHy02nFic6jwJ90"
}

* Register - /api/register

requrest body
{
    email,
    password,
    confirmPass
}

response body
{
    gender: String,
    dateOfBirth: Number,
    zodiac: Number,
    country: String,
    city: String,
    profileImage: String,
    firstName: String,
    lastName: String,
    "popularity": 0,
    "visits": 0,
    "_id": "5757d9b572ff19f833594e3c",
    "email": "valeri23@abv.bg",
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzU3ZDliNTcyZmYxOWY4MzM1OTRlM2MiLCJpYXQiOjE0NjUzNzUxNTgsImV4cCI6MTQ2NTQ2MTU1OH0.0iRiURI9V8oRgVl6Ao1XEC0VrkpFkHy02nFic6jwJ90"
}