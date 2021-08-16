var express = require("express");
var router = express.Router();
const db = require("../model/helper");



router.get("/", async function (req, res, next) {
    let sql = `SELECT DATE_FORMAT(r.date, '%Y-%m-%d'), r.incident, r.username, v.venuename, v.address
    FROM reviews r
    INNER JOIN venues v ON r.venue_id=v.id`;
    let result = await db(sql)
    // 3. Retornar um response para o frontend
    res.status(200).send(result.data); 

})
router.post("/", async function (req, res, next) {
    // pesquisa a venue
    //venue existe? -> adicione review a essa venue existente
    //venue não existe? -> cria nova venue e review

    let venue_id = req.body.venue_id;
    if (venue_id === "" || venue_id === undefined) {
        // 1. Cria a venue;
        let { address, venuename } = req.body;
        let sql = `INSERT INTO venues (address, venuename)
        VALUES ("${address}", "${venuename}")`; 
        await db(sql);
        //pega as informações da venue
        sql = `SELECT * FROM venues WHERE venuename = "${venuename}"`;
        let response = await db(sql);
        let data = response.data;
        venue_id = data[0].id;
    };
    let { date, incident, username} = req.body;
    sql = `INSERT INTO reviews (venue_id, date, incident, username)
    VALUES ("${venue_id}","${date}", "${incident}", "${username}")
    `;
    //backedn não estava retornando minhas reviews pq eu não estava
    //fazendo o select dele!!!!!!!!!!!!!!!!!
    await db(sql);
    let lastInsertedReviewSQL = `SELECT DATE_FORMAT(r.date, '%Y-%m-%d'), r.incident, r.username, v.venuename, v.address
    FROM reviews r
    INNER JOIN venues v ON r.venue_id=v.id ORDER BY r.id DESC`;
    let result = await db(lastInsertedReviewSQL)
    let review = result.data[0];
    // 3. Retornar um response para o frontend
    res.status(201).send(review); 

});


module.exports = router;
