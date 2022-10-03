const express = require("express");
var router = express.Router();
const {numberNobels, byLaureates, categoryNobels} = require("../controllers/nobels.controller.js");

router.get("/byLaureates", byLaureates);
router.get("/category", categoryNobels);
router.get("/", numberNobels);

module.exports = router;