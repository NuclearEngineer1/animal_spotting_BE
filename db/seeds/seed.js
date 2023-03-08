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
      author VARCHAR NOT NULL REFERENCES users(username),
      hash VARCHAR NOT NULL
    )`
  );

  await db.query(
    `CREATE TABLE sightings (
      spotting_id SERIAL PRIMARY KEY,
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
      return [
        username,
        hash
      ];
    })
  );

  const formattedCommentData = commentData.map(convertTimeStampToDate)

  const formattedSightingData = sightingData.map(convertTimeStampToDate)

  

};
