const express = require("express");
const eventsRouter = require("./routes/EventsRouter");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", eventsRouter);

module.exports = app;
