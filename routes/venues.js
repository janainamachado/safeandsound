var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function(req, res, next) {
  let venuename = req.query.venuename;

  if (venuename === "" || venuename === undefined) {
    await db(`SELECT * FROM venues`)
      .then(results => {
        console.log("venues", results);
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  } else {
    await db(`SELECT * FROM venues WHERE venuename LIKE "${venuename}%"`)
      .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  }
});

router.get("/", async function(req, res, next) {
  let venue_id = req.body.venue_id;
  await db(`SELECT venuename, address FROM venues WHERE venue_id = ${venue_id}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.get("/:id/reviews", async function(req, res) {
  let venue_id = req.params.id;
  let sql = `SELECT DATE_FORMAT(r.date, '%Y-%m-%d') as review_date, r.incident, r.username, r.venue_id, v.venuename, v.address 
    FROM reviews r
    INNER JOIN venues v ON r.venue_id=v.id
    WHERE r.venue_id=${venue_id}`;
  let results = await db(sql);
  res.status(200).send(results.data);
  // .catch(err => res.status(500).send(err));
});

module.exports = router;
