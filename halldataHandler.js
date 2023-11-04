const express = require("express");
const router = express.Router();

const con = require("./db");

router.post("/getHallDetails", (req, res) => {
  const hall = req.body.classroom;

  const detailQuery =
    "select distinct examdate,starttime,endtime from details where classroom = ?";

  con.query(detailQuery, [hall], (error, results) => {
    if (error) throw error;
    if (results.length > 0) res.json(results);
    else res.status(404).send(error);
  });
});

module.exports = router;
