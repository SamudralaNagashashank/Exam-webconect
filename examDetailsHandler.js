const express = require("express");
const con = require("./db");

const router = express.Router();

router.post("/getExamDetails", (req, res) => {
  const dept = req.body.department;
  const year = req.body.year;

  const detailsQuery =
    "select distinct subject,examdate,starttime,endtime from details where department = ? and year = ?";

  con.query(detailsQuery, [dept, year], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(500).json({ success: false });
    }
  });
});

module.exports = router;
