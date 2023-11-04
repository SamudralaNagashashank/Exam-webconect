const express = require("express");
const router = express.Router();

const con = require("./db");

router.get("/getFormData", (req, res) => {
  const barnchQuery = "SELECT DISTINCT department FROM studenttable";
  const yearQuery = "SELECT DISTINCT year FROM studenttable";

  con.query(barnchQuery, (error, branchResults) => {
    if (error) throw error;

    con.query(yearQuery, (error, yearResults) => {
      if (error) throw error;

      res.json({ branches: branchResults, years: yearResults });
    });
  });
});

module.exports = router;
