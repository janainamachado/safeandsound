var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var geocode = require("../helpers/geo-opencage");

router.get("/", async function(req, res, next) {
  let sql = `SELECT DATE_FORMAT(r.date, '%Y-%m-%d'), r.incident, r.username, r.venue_id, v.venuename, v.address 
    FROM reviews r
    INNER JOIN venues v ON r.venue_id=v.id`;
  let result = await db(sql);
  res.status(200).send(result.data);
});

router.post("/", async function(req, res, next) {
  let venue_id = req.body.venue_id;
  if (venue_id === "" || venue_id === undefined) {
    let { address, venuename } = req.body;
    let geoloc = await geocode(address);
    let lat = geoloc.data.latLng[0];
    let longitude = geoloc.data.latLng[1];

    let sql = `INSERT INTO venues (address, venuename, lat, longitude) VALUES (?, ?, ?, ?)`;
    await db(sql, [address, venuename, lat, longitude]);

    sql = `SELECT * FROM venues WHERE venuename = ?`;
    let response = await db(sql, [venuename]);
    let data = response.data;
    venue_id = data[0].id;
  }

  let { date, incident, username } = req.body;
  sql = `INSERT INTO reviews (venue_id, date, incident, username) VALUES (?, ?, ?, ?)`;
  await db(sql, [venue_id, date, incident, username]);

  let lastInsertedReviewSQL = `SELECT DATE_FORMAT(r.date, '%Y-%m-%d'), r.incident, r.username, r.venue_id, v.venuename, v.address
    FROM reviews r
    INNER JOIN venues v ON r.venue_id = v.id ORDER BY r.id DESC`;
  let result = await db(lastInsertedReviewSQL);
  let review = result.data[0];
  res.status(201).send(review);
});

module.exports = router;
