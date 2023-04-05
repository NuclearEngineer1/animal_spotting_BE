const { selectSightings, insertUser, checkHash } = require("./models");
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
  })
}
