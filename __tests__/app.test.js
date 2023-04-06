const app = require("../app.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const bcrypt = require("bcrypt");

afterAll(() => db.end());

beforeEach(() => seed(testData));

describe("GET /api/sightings", () => {
  test("returns 200 and a list of sightings", () => {
    return request(app)
      .get("/api/sightings")
      .expect(200)
      .then(({ body: { sightings } }) => {
        expect(sightings).toBeInstanceOf(Array);
        expect(sightings).toHaveLength(5);
        sightings.forEach((sighting) => {
          expect(sighting).toEqual(
            expect.objectContaining({
              species: expect.any(String),
              lat: expect.any(Number),
              long: expect.any(Number),
              date_spotted: expect.any(String),
              date_submitted: expect.any(String),
              author: expect.any(String),
              img_base64: expect.any(String),
              description: expect.any(String),
              votes: expect.any(Number),
              sighting_id: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("POST /api/sightings", () => {
  test("Returns 201 and sighting is added to database and returned", () => {
    return request(app)
      .post("/api/sightings")
      .send({
        species: "California Kingsnake",
        lat: 36.08945494269478,
        long: -119.71483577429336,
        date_spotted: 1675343628,
        author: "naruto",
        img_base64: "example string",
        description:
          "Seems Hasbullah escaped and made it back to his home state",
      })
      .expect(201)
      .then((sighting) => {
        expect(sighting.body).toEqual(expect.objectContaining({
          sighting_id: expect.any(Number),
          species: "California Kingsnake",
          lat: 36.08945494269478,
          long: -119.71483577429336,
          date_spotted: expect.any(String),
          date_submitted: expect.any(String),
          author: "naruto",
          img_base64: "example string",
          description:
            "Seems Hasbullah escaped and made it back to his home state",
          votes: 0,
        }));
        return db.query(
          `SELECT * FROM sightings WHERE sighting_id = ${sighting.body.sighting_id}`
        );
      })
      .then((sighting) => {
        console.log(typeof sighting.rows[0].date_spotted)
        expect(sighting.rows[0]).toEqual(
          expect.objectContaining({
            sighting_id: expect.any(Number),
            species: "California Kingsnake",
            lat: 36.08945494269478,
            long: -119.71483577429336,
            date_spotted: expect.any(Date),
            date_submitted: expect.any(Date),
            author: "naruto",
            img_base64: "example string",
            description:
              "Seems Hasbullah escaped and made it back to his home state",
            votes: 0,
          })
        );
      });
  });
});

describe("GET /api/login", () => {
  test("returns 200 and true if user is authorized", () => {
    return request(app)
      .get("/api/auth")
      .send({
        username: "naruto",
        password: "dsfnjbgf74b8",
      })
      .expect(200)
      .then(({ body: { authorized } }) => {
        expect(authorized).toEqual(true);
      });
  });
  test("returns 200 and false if user isn't authorized", () => {
    return request(app)
      .get("/api/auth")
      .send({
        username: "naruto",
        password: "potato",
      })
      .expect(200)
      .then(({ body: { authorized } }) => {
        expect(authorized).toEqual(false);
      });
  });
});

describe("POST /api/register", () => {
  test("returns 201 and user is added to database", () => {
    return request(app)
      .post("/api/register")
      .send({
        username: "Zuko123",
        password: "fdasjb328gasduy32v",
      })
      .expect(201)
      .then(() => {
        return db.query("SELECT * from users WHERE username = 'Zuko123'");
      })
      .then((user) => {
        expect(user.rows[0].username).toEqual("Zuko123");
        return bcrypt.compare("fdasjb328gasduy32v", user.rows[0].hash);
      })
      .then((result) => {
        expect(result).toEqual(true);
      });
  });
});
