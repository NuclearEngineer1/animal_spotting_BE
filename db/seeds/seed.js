const format = require("pg-format");
const db = require("../connection");
const { convertTimestampToDate } = require("./utils");

const seed = async ({ sightingData, commentData}) => {
  await db.query("DROP TABLE IF EXISTS comments");
  await db.query("DROP TABLE IF EXISTS sightings");
  await db.query("DROP TABLE IF EXISTS users");
  
  await db.query(
    `CREATE TABLE sightings (
      sighting_id SERIAL PRIMARY KEY,
      species VARCHAR NOT NULL,
      lat FLOAT NOT NULL,
      long FLOAT NOT NULL,
      date_spotted TIMESTAMP NOT NULL,
      date_submitted TIMESTAMP DEFAULT NOW(),
      author VARCHAR NOT NULL,
      img_base64 VARCHAR,
      description VARCHAR,
      votes INT DEFAULT 0   
    )`
  );

    await db.query(
      `CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      sighting_id INT NOT NULL REFERENCES sightings(sighting_id),
      body VARCHAR NOT NULL,
      author VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      votes INT DEFAULT 0
    )`
    );
  
  

  const formattedCommentData = commentData.map(convertTimestampToDate);

  const formattedSightingData = sightingData.map(convertTimestampToDate);


  const insertCommentsQueryStr = format(
    `INSERT INTO comments (sighting_id, body, author, created_at, votes) VALUES %L RETURNING *`,
    formattedCommentData.map(({ sighting_id, body, author, created_at, votes }) => {
      return [sighting_id, body, author, created_at, votes];
    })
  );

  const insertSightingsQueryStr = format(
    `INSERT INTO sightings (species, lat, long, date_spotted, date_submitted, author, img_base64, description, votes) VALUES %L RETURNING *`,
    formattedSightingData.map(
      ({
        species,
        lat,
        long,
        date_spotted,
        date_submitted,
        author,
        img_base64,
        description,
        votes
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
          votes
        ];
      }
    )
  );

  await db.query(insertSightingsQueryStr).then(result => result.rows);

  await db.query(insertCommentsQueryStr);

};

module.exports = seed;

