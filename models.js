const db = require("./db/connection");
const bcrypt = require("bcrypt");
const format = require("pg-format");
const {convertTimestampToDate} = require("./db/seeds/utils")

exports.selectSightings = () => {
  return db.query("SELECT * FROM sightings").then((topics) => {
    return topics.rows;
  });
};

exports.insertUser = (req) => {
  return bcrypt.hash(req.body.password, 10).then((hash) => {
    return db.query("INSERT INTO users VALUES ($1, $2) RETURNING *", [
      req.body.username,
      hash,
    ]);
  });
};

exports.checkHash = (req) => {
  return db
    .query("SELECT * FROM users WHERE username = $1", [req.body.username])
    .then((user) => {
      return bcrypt.compare(req.body.password, user.rows[0].hash);
    });
};

exports.insertSighting = (req) => {
  const sightingObj = { ...req.body }
  sightingObj.date_spotted = new Date(req.body.date_spotted)
  return db.query("INSERT INTO sightings (species, lat, long, date_spotted, author, img_base64, description) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
  Object.values(sightingObj))
}