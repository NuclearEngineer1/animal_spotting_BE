const { selectSightings, insertUser } = require("./models");

exports.getSightings = (req, res, next) => {
  selectSightings().then((sightings) => {
    res.send({ sightings });
  });
};

exports.postUser = (req, res, next) => {
  insertUser(req).then(() => {
    res.status(201);
  });
};
