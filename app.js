const express = require("express")

const {
  getSightings,
  postUser,
  getAuth,
  postSighting
} = require("./controllers")

const app = express()
app.use(express.json());

app.get("/api/sightings", getSightings)

app.post("/api/sightings", postSighting);

app.get("/api/auth", getAuth);

app.post("/api/register", postUser)

module.exports = app