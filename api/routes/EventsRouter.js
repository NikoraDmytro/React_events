const router = require("express").Router();
const con = require("../connection.js");
const getDate = require("../public/functions/getDate.js");
const parseServerResponse = require("../public/functions/parseServerResponse.js");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const connection = await con;
    await connection.execute("DELETE FROM events_table WHERE event_date < ?", [
      getDate(),
    ]);

    const sql = "SELECT * FROM events_table";

    const [events, field] = await connection.execute(sql);

    res.json(parseServerResponse(events));
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/add_event", async (req, res) => {
  try {
    const connection = await con;
    const values = Object.values(req.body);

    const firstSql = `
    SELECT event_name
    FROM events_table 
    WHERE event_date = ? 
      AND event_end >= ? 
      AND event_start <= ?
    `;

    const [
      overlappingTimeIntervals,
      fields,
    ] = await connection.execute(firstSql, [
      req.body.eventDate,
      req.body.eventStart,
      req.body.eventEnd,
    ]);

    if (overlappingTimeIntervals.length) {
      res.status(403).send("Time is busy!");
      return;
    }

    const secondSql = `
    INSERT INTO events_table 
    VALUES (DEFAULT,?,?,?,?) 
    `;

    const response = await connection.execute(secondSql, [...values]);

    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
