const express = require("express");
const con = require("./db");

const router = express.Router();

router.post("/getStudentDetails", (req, res) => {
  const roll = req.body.rollNo;

  const detailsQuery = "select * from studenttable where rollNo = ?";

  con.query(detailsQuery, [roll], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(500).json({ success: false });
    }
  });
});

module.exports = router;
