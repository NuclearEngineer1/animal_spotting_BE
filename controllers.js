const { selectSightings, insertUser } = require("./models");
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
