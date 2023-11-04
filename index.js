const express = require("express");

const adminHandler = require('./adminHandler');
const adminBYHandler = require("./adminBYHandler");
const dataInsertHandler = require('./dataInsertHandler');
const submitInsertDataHandler = require("./submitInsertDataHandler");
const branchWiseFormHandler = require("./branchWiseFormHandler");
const examDetailsHandler = require("./examDetailsHandler");
const arrangeDetailsHandler = require("./arrangeDetailsHandler");
const rollNumberDetailsHandler = require("./rollNumberDetailsHandler");
const individualDataHandler = require("./individualDataHandler");
const hallFormHandler = require("./hallFormHandler");
const halldataHanlder = require("./halldataHandler");
const deptDataHandler = require("./deptDataHanlder");
const cleardb = require("./cleardb");

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(express.static('public'));

app.use('/',adminHandler);
app.use('/',adminBYHandler);
app.use('/',dataInsertHandler);
app.use('/',submitInsertDataHandler);
app.use("/",branchWiseFormHandler);
app.use("/",examDetailsHandler);
app.use("/",arrangeDetailsHandler);
app.use("/",rollNumberDetailsHandler);
app.use("/",individualDataHandler);
app.use("/",hallFormHandler);
app.use("/",halldataHanlder);
app.use("/",deptDataHandler);
app.use("/",cleardb);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});