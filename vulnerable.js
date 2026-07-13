const express = require("express");
const sqlite3 = require("sqlite3");
const { exec } = require("child_process");

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

app.get("/diagnostics", (req, res) => {
  const host = req.query.host;

  // Deliberately vulnerable test case - command injection.
  exec("ping -c 1 " + host, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(stderr || err.message);
    }

    res.type("text/plain").send(stdout);
  });
});

app.listen(3000);
