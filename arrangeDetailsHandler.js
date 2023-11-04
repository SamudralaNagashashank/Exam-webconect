const express = require("express");
const router = express.Router();
const con = require("./db");

router.post("/getArrangeDetails", (req, res) => {
  const subject = req.body.subject;

  const hallQuery = "Select DISTINCT classroom from details where subject= ? ";
  con.query(hallQuery, [subject], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
