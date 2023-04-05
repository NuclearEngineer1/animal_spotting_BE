const express = require("express")

const {
  getSightings,
  postUser,
  getAuth
} = require("./controllers")

const app = express()
app.use(express.json());

app.get("/api/sightings", getSightings)

app.post("/api/register", postUser)

app.get("/api/auth", getAuth)

module.exports = app