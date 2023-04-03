const express = require("express")

const {
  getSightings
} = require("./controllers")

const app = express()

app.get("/api/sightings", getSightings)