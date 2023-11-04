const express = require("express");
const router = express.Router();

const con = require("./db");

router.get("/getHallFormData", (req, res) => {
  const hallQuery = "Select Distinct classroom from details";

  con.query(hallQuery, (error, results) => {
    if (error) throw error;

    res.json(results);
  });
});

module.exports = router;
