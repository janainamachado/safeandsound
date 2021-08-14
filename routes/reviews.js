var express = require("express");
var router = express.Router();
const db = require("../model/helper");


// INSERT a new review into the DB
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
    await db(sql);
    // 3. Retornar um response para o frontend
    res.status(201).send(); 

});

// DELETE a review from the DB


module.exports = router;
