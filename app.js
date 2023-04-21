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

module.exports = app