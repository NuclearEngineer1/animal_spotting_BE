const db = require("./db/connection");
const bcrypt = require("bcrypt");
const format = require("pg-format");
const {convertTimestampToDate} = require("./db/seeds/utils")

exports.selectSightings = () => {
  return db.query("SELECT * FROM sightings").then((topics) => {
    return topics.rows;
  });
};


exports.insertSighting = (req) => {
  const sightingObj = { ...req.body }
  sightingObj.date_spotted = new Date(req.body.date_spotted)
  return db.query("INSERT INTO sightings (species, lat, long, date_spotted, author, img_base64, description) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
  Object.values(sightingObj))
}