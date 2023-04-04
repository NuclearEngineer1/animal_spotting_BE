const bcrypt = require("bcrypt")

const testUsers = [
  {
    username: "badmanting",
    password: "hfg732hhaswdf7",
  },
  {
    username: "madDog123",
    password: "dskj348hfwsjb",
  },
  {
    username: "bossman123",
    password: "dsnkjdvhn74basv",
  },
  {
    username: "naruto",
    password: "dsfnjbgf74b8",
  },
  {
    username: "kevin",
    password: "dsfnjsb784be7",
  },
];
  
const testHashes = []

for (const user of testUsers) {
  bcrypt.hash(user.password, 10).then((hash) => {
    testHashes.push({
      username: user.username,
      hash: hash
    })
  })
}

module.exports = testHashes;