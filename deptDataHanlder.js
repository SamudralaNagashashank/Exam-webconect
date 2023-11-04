const express = require("express");
const router = express.Router();

const con = require("./db");

router.post("/getDept", (req, res) => {
  const hall = req.body.classroom;
  const date = req.body.date;
  const detailQuery =
    "select distinct * from details where classroom = ? and examdate= ?";


  con.query(detailQuery, [hall,date], (error, results) => {
    if (error) throw error;
    if (results.length > 0) res.json(results);
    else res.status(404).send(error);
  });
});

module.exports = router;
