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

exports.postUser = (req, res, next) => {
  insertUser(req).then((user) => {
    res.sendStatus(201);
  });
};

exports.getAuth = (req, res, next) => {
  checkHash(req).then((auth) => {
    if (auth) {
      res.send({ authorized: true });
    } else {
      res.send({ authorized: false });
    }
  });
};

exports.postSighting = (req, res, next) => {
  insertSighting(req).then((sighting) => {
    res.status(201)
    res.send(sighting.rows[0])
  });
};
