const db = require("./db/connection");

exports.selectSightings = () => {
  return db.query("SELECT * FROM sightings").then((topics) => {
    return topics.rows;
  });
};
