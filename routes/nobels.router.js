const express = require("express");
var router = express.Router();
const {numberNobels} = require("../controllers/nobels.controller.js");

router.get("/", numberNobels);

module.exports = router;