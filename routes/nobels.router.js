const express = require("express");
var router = express.Router();
const {numberNobels, byLaureates, categoryNobels, NobelsMax, parAn} = require("../controllers/nobels.controller.js");

router.get("/byLaureates", byLaureates);
router.get("/category", categoryNobels);
router.get("/max", NobelsMax);
router.get("/year", parAn);
router.get("/", numberNobels);

module.exports = router;