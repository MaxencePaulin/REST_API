const dotenv = require("dotenv");
dotenv.config();
// const datasource = process.env.DATASOURCE;
const nobelsService = require("../services/nobels.service.js");

// GET 
exports.numberNobels = (req, res, next) => {
    nobelsService.listerNombreNobels((error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // 200 => OK
        return res.status(200).send({ success: 1, nbNobels: results});
    });
};

exports.categoryNobels = (req, res) => {
    nobelsService.listerCategoryNobels(req, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.NobelsMax = (req, res) => {
    nobelsService.listerCategoryNobelsMax((error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.parAn = (req, res) => {
    nobelsService.listerNombreNobelsParAn(req, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.nobelsInfo = (req, res) => {
    nobelsService.afficheNobelsInfo(req, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.noNobels = (req, res) => {
    nobelsService.listerAnneeSansNobel(req, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
}