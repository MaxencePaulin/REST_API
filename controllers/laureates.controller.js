const dotenv = require("dotenv");
dotenv.config();
// const datasource = process.env.DATASOURCE;
const laureatesService = require("../services/laureates.service.js");

// GET 
exports.list = (req, res, next) => {
    laureatesService.listerLaureats(req, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // 200 => OK
        return res.status(200).send({ success: 1, data: results });
    });
};
exports.afficheInfo = (req, res, next) => {
    laureatesService.lireIdLaureats(req,(error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // 200 => OK
        return res.status(200).send({ success: 1, data: results });
    });
};

exports.severalNobels = (req, res, next) => {
    laureatesService.numberMore1Nobel(req, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
};