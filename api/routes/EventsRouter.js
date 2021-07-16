const router = require("express").Router();
const mysql = require("mysql2/promise");
require("dotenv").config();

const addZero = (number) => {
  return Math.floor(number / 10).toString() + (number % 10).toString();
};

const getDate = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return year + "-" + addZero(month) + "-" + addZero(day);
};

router.get("/", async (req, res) => {
  try {
    const connection = await require("../connection.js");

    await connection.execute("DELETE FROM events_table WHERE event_date < ?", [
      getDate(),
    ]);

    const sql = "SELECT * FROM events_table";

    const [events, field] = await connection.execute(sql);

    res.json(events);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/add_event", async (req, res) => {
  try {
    const connection = await require("../connection.js");
    const values = Object.values(req.body);

    const firstSql = `
    SELECT event_name
    FROM events_table 
    WHERE event_end >= ? AND event_start <= ?
    `;

    const [
      overlappingTimeIntervals,
      fields,
    ] = await connection.execute(firstSql, [
      req.body.event_start,
      req.body.event_end,
    ]);

    if (overlappingTimeIntervals.length) {
      res.status(400).json("This time is busy");
      return;
    }

    const secondSql = `
    INSERT INTO events_table 
    VALUES (DEFAULT,?,?,?,?) 
    `;

    const response = await connection.execute(secondSql, [...values]);

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
