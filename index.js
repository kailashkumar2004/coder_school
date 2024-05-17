const mongoose = require("mongoose");
const express = require("express");
const db = require("./src/db/database");
const router = require("./router");
const PORT = 2310;
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");



app.get("/", (req, res) => {
    res.send("welcome to my profile")
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router.map(router => {
    app.use(router.path, router.handler)
});
app.listen(PORT, () => {
    console.log(`server is runing at PORT number ${PORT}`)
});