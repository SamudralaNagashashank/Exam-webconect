const express = require("express");
const router = express.Router();

router.get("/submitBranchForm", (req, res) => {
  const branch = req.query.branch;
  const year = req.query.year;

  const result = {
    department: branch,
    year: year,
  };


  if(result) {
    res.json(result);
  } else {
    res.json({ error: "details error" });
  }
});

module.exports = router;
