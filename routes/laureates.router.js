const express = require("express");
var router = express.Router();
const {list, afficheInfo, severalNobels, laureatesFilter} = require("../controllers/laureates.controller.js");

router.get("/id=:id", afficheInfo);
router.get("/severalNobels", severalNobels);
router.get("/filter", laureatesFilter);
router.get("/", list);

module.exports = router;