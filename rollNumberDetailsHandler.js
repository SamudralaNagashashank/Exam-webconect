const express = require("express");
const router = express.Router();
const con = require("./db");

router.post("/getrollDetails", (req, res) => {
  const subject = req.body.subject;
  const hall = req.body.classroom;

  const rollQuery = "Select distinct enrollnumber from details where subject= ?  and classroom = ?";
  con.query(rollQuery, [subject,hall], (err, results) => {
    if (err) throw err;
    if(results.length>0)res.json(results);
    else
    {
      res.status(404).json({error : "empty data"});
    }
  });
});

module.exports = router;
