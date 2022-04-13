const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect((err, db) => {
      //verify db is a good object
      if (db) {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB.");
      }
      return (callback(err));
    });
  },
  getDB: function () {
    return -db;
  },
};