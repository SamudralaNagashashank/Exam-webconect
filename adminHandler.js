const express = require("express");
const router = express.Router();

const con = require("./db"); //database connection importing

router.post("/adminLogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  con.query(
    "SELECT * FROM adminTable WHERE adminName = ? AND password = ?",
    [username, password],
    (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});

module.exports = router;
