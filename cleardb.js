const express = require("express");
const router = express.Router();
const con = require("./db");

router.get("/clearDb", (req, res) => {
  
    const q = "truncate details";

    con.query(q,(err,results)=>{
        if(err) throw err;
        res.json({success:true});
    })
  
});

module.exports = router;
