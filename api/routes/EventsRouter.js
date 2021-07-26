const router = require("express").Router();
const con = require("../connection.js");
const getDate = require("../public/functions/getDate.js");
const parseServerResponse = require("../public/functions/parseServerResponse.js");

router.get("/", async (req, res) => {
  try {
    const connection = await con;
    await connection.execute("DELETE FROM events_table WHERE event_date < ?", [
      getDate(),
    ]);

    const sql = "SELECT * FROM events_table ORDER BY event_date, event_start";

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

router.post("/edit_event", async (req, res) => {
  try {
    const connection = await con;

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
    UPDATE events_table 
    SET event_date = ?,event_start = ?, event_end = ?
    WHERE event_id = ?
    `;

    const response = await connection.execute(secondSql, [
      req.body.eventDate,
      req.body.eventStart,
      req.body.eventEnd,
      req.body.eventId,
    ]);

    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete_event/:id", async (req, res) => {
  try {
    const connection = await con;

    const sql = "DELETE FROM events_table WHERE event_id = ?";

    const response = await connection.execute(sql, [req.params.id]);

    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
