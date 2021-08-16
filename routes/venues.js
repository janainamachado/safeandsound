var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET venues list
router.get("/", async function (req, res, next) {
  let venuename = req.query.venuename;
  console.log("params", venuename)
    db(`SELECT * FROM venues WHERE venuename LIKE "${venuename}%"`)
    .then(results => {
      res.send(results.data); // [ {id: 1, venuename: "Pub", address: ""}, {}, {} ]
    })
    .catch(err => res.status(500).send(err));
});
  
module.exports = router;
