const express = require('express');
const router = express.Router();


const con = require("./db");


router.post('/subjectDetails', (req, res) => {
    const department  = req.body.department;
    const year = req.body.year;

    const subjectquery = "SELECT subject from subjecttable where department = ? and year = ?";

    con.query(subjectquery,[department,year],(err,results)=>{
        if(err) throw err;
        if(results.length>0)
        {
            res.json(results);
        }
        else
        {
            res.status(500).json({ success: false });
        }
    })
});

module.exports = router;