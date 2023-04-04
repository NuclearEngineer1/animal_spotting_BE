const express = require("express")

const {
  getSightings,
  postUser
} = require("./controllers")

const app = express()
app.use(express.json());

app.get("/api/sightings", getSightings)

app.post("/api/register", postUser)


module.exports = app