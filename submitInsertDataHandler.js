const express = require("express");
const router = express.Router();
const con = require("./db");

router.post("/submitDataInsertForm", (req, res) => {
  const year = req.body.year;
  const department = req.body.department;
  const startNumber = req.body.startNumber;
  const endNumber = req.body.endNumber;
  const subject = req.body.subject;
  const classroom = req.body.classroom;
  const date = req.body.date;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  const insertQuery =
    "INSERT INTO details(year, department, enrollnumber, classroom, subject, examdate, starttime, endtime) VALUES ?;";

  let i = startNumber;
  const values = [];

  while (i <= endNumber) {
    values.push([
      year,
      department,
      i,
      classroom,
      subject,
      date,
      startTime,
      endTime,
    ]);
    i++;
  }

  

  con.query(insertQuery, [values], (err, results) => {
    if (err) {
      console.error("Error inserting data: ", err);
      res.status(500).json({ success: false });
    } else {
      console.log("Data inserted successfully");
      res.status(200).json({ success: true });
    }
  });
});

module.exports = router;
