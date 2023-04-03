const db = require("./db/connection");

exports.selectSightings = () => {
  return db.query("SELECT * FROM SIGHTINGS").then((topics) => {
    return topics.rows;
  });
};
