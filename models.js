const db = require("./db/connection");
const bcrypt = require("bcrypt")

exports.selectSightings = () => {
  return db.query("SELECT * FROM sightings").then((topics) => {
    return topics.rows;
  });
};

exports.insertUser = (req) => {
  return bcrypt.hash(req.body.password, 10).then((hash) => {
    return db.query("INSERT INTO users VALUES ($1, $2)", [
      req.body.username,
      hash,
    ]);
  })
}
