const express = require("express");
var router = express.Router();
const {list, afficheInfo} = require("../controllers/laureates.controller.js");

router.get("/id=:id", afficheInfo);
router.get("/page=:page", list);
router.use("/", (req, res) => {
    res.redirect("/laureates/page=1");
})

module.exports = router;