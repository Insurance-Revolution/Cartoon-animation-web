const express = require("express");
const sqlite3 = require("sqlite3");

const app = express();
const db = new sqlite3.Database(":memory:");

app.get("/user", (req, res) => {
  const id = req.query.id;

  // Deliberately vulnerable - SQL Injection
  const query = "SELECT * FROM users WHERE id = " + id;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

app.listen(3000);
