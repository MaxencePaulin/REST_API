const dotenv = require("dotenv");
dotenv.config();
// const datasource = process.env.DATASOURCE;
const nobelsService = require("../services/nobels.service.js");
const {listerCategory} = require("../services/nobels.service");

// GET 
exports.numberNobels = (req, res) => {
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
exports.all = (req, res) => {
    console.log("test",req.query.category);
    nobelsService.allPrizes(req.query.category, req.query.year, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // console.log(results);
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.template1 = (req, res) => {
    console.log("test",req.query.category);
    nobelsService.allPrizes(req.query.category,(error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // console.log(results);
        return res.render("template1", {
            category: listerCategory,
            // data:results
        });
    });
}

exports.template2 = (req, res, next) => {
    nobelsService.allPrizes(req.query.category, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // console.log(results);
        return res.render("template2", {
            category: listerCategory,
            // data:results
        });
    });
}