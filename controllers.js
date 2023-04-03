const { selectSightings } = require("./models");

exports.getSightings = (req, res, next) => {
  selectSightings().then((sightings) => {
    res.send({sightings})
  })
}