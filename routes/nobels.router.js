const express = require("express");
var router = express.Router();
const {numberNobels, categoryNobels, NobelsMax, parAn, nobelsInfo} = require("../controllers/nobels.controller.js");

router.get("/category", categoryNobels);
router.get("/max", NobelsMax);
router.get("/year", parAn);
router.get("/laureatesId=:id", nobelsInfo);
router.get("/", numberNobels);

module.exports = router;