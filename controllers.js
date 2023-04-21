const {
  selectSightings,
  insertUser,
  checkHash,
  insertSighting,
} = require("./models");
const db = require("./db/connection");

exports.getSightings = (req, res, next) => {
  selectSightings().then((sightings) => {
    res.send({ sightings });
  });
};

exports.postSighting = (req, res, next) => {
  insertSighting(req).then((sighting) => {
    res.status(201)
    res.send(sighting.rows[0])
  });
};
