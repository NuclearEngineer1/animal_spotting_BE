const format = require("pg-format");
const db = require("../connection");
const { convertTimeStampToDate } = require("./utils");

const seed = async ({ sightingData, commentData, userData }) => {
  await db.query("DROP TABLE IF EXISTS sightings");
  await db.query("DROP TABLE IF EXISTS comments");
  await db.query("DROP TABLE IF EXISTS users");

  await db.query(
    `CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      hash VARCHAR NOT NULL
    )`
  );

  await db.query(
    `CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      sighting_id INT NOT NULL REFERENCES sightings(sighting_id),
      body VARCHAR NOT NULL,
      author VARCHAR NOT NULL REFERENCES users(username),
      created_at TIMESTAMP DEFAULT NOW()
    )`
  );

  await db.query(
    `CREATE TABLE sightings (
      sighting_id SERIAL PRIMARY KEY,
      species VARCHAR NOT NULL,
      lat FLOAT NOT NULL,
      long FLOAT NOT NULL,
      date_spotted TIMESTAMP NOT NULL,
      date_submitted TIMESTAMP DEFAULT NOW(),
      author VARCHAR NOT NULL REFERENCES users(username),
      img_base64 VARCHAR,
      description VARCHAR     
    )`
  );

  const insertUsersQueryStr = format(
    `INSERT INTO users (username, hash) VALUES %L RETURNING *`,
    userData.map(({ username, hash }) => {
      return [username, hash];
    })
  );

  const formattedCommentData = commentData.map(convertTimeStampToDate);

  const formattedSightingData = sightingData.map(convertTimeStampToDate);

  const insertCommentsQueryStr = format(
    `INSERT INTO comments (sighting_id, body, author, created_at) VALUES %L RETURNING *`,
    commentData.map(({ sighting_id, body, author, created_at }) => {
      return [sighting_id, body, author, created_at];
    })
  );

  const insertSightingsQueryStr = format(
    `INSERT INTO sightings (species, lat, long, date_spotted, date_submitted, author, img_base64, description) VALUES %L RETURNING *`,
    sightingData.map(
      ({
        species,
        lat,
        long,
        date_spotted,
        date_submitted,
        author,
        img_base64,
        description,
      }) => {
        return [
          species,
          lat,
          long,
          date_spotted,
          date_submitted,
          author,
          img_base64,
          description,
        ];
      }
    )
  );

  await db.query(insertUsersQueryStr);

  await db.query(insertSightingsQueryStr);

  await db.query(insertCommentsQueryStr);
};

module.exports = seed;

