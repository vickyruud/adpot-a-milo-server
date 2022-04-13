const express = require("express");

//recordRoutes is an instance of express router
//It is used to define our routes
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

//this will help us to connect to the database
const dbo = require("../db/conn");

//Convert the id from string to ObjectID for the _id.

const ObjectId = require("mongodb").ObjectId;

//this section will get a list of all the records

recordRoutes.route("/record").get((req, res) => {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("records")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

//this will return a single record by id
recordRoutes.route("/recor/id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myQuery, (err, results) => {
      if (err) throw err;
      res.json(result);
    });

});

// This section will help you create a new record.
recordRoutes.route("/record/add").post( (req, response) => {
  let db_connect = dbo.getDb();
  let myObj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection("records").insertOne(myObj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post((req, response) => {
  let db_connect = dbo.getDb();  
  let myQuery = { _id: ObjectId( req.params.id )};  
  let newValues = {    
    $set: {      
      name: req.body.name,     
      position: req.body.position,      
      level: req.body.level,    
    },  
  };
});
  
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
