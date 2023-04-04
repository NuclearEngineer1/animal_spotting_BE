const app = require("../app.js")
const request = require("supertest")
const testData = require("../db/data/test-data/index.js")
const seed = require("../db/seeds/seed.js")
const db = require("../db/connection.js")
const bcrypt = require("bcrypt")

afterAll(() => db.end())

beforeEach(() => seed(testData))

describe("GET /api/sightings", () => {
  test("returns 200 and a list of sightings", () => {
    return request(app)
      .get("/api/sightings")
      .expect(200)
      .then(({ body: { sightings } }) => {
        expect(sightings).toBeInstanceOf(Array)
        expect(sightings).toHaveLength(5)
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
              sighting_id: expect.any(Number)
            })
          )
        })
      })
  })
})

describe("POST /api/register", () => {
  // test('returns 201 and user is added to database', async () => {
  //      return request(app)
  //     .post('/api/register')
  //     .send({
  //       username: "Zuko123",
  //       password: "fdasjb328gasduy32v"
  //     })
  //     .expect(201)
    //      .then(() => {
    //     console.log("in first then")
    //      return db.query("SELECT from users WHERE username = Zuko123")
    //      })
    //      .then(user => {
    //     console.log("in second then")
    //        expect(user.username).toEqual("Zuko123")
    //     return bcrypt.compare("fdasjb328gasduy32v", user.hash);
    //   }).then((result) => {
    //   console.log("In last then")
    //     expect(result.toEqual(True))
    // })
  });
})

