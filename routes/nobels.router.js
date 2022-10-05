const express = require("express");
var router = express.Router();
const {numberNobels, categoryNobels, 
    NobelsMax, parAn, nobelsInfo, noNobels, 
    listerYearNobelAsc, listerYearNobelDesc} = require("../controllers/nobels.controller.js");

router.get("/category", categoryNobels);
router.get("/max", NobelsMax);
router.get("/year", parAn);
router.get("/laureatesId=:id", nobelsInfo);
router.get("/noNobels", noNobels);
router.get("/yearAsc", listerYearNobelAsc);
router.get("/yearDesc", listerYearNobelDesc);
router.get("/", numberNobels);

module.exports = router;