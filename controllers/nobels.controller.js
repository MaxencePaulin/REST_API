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
    nobelsService.allPrizes(req.query.category, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // console.log(results);
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.laureatesByCategory = (req, res) => {
    nobelsService.listerCategoryNobels(req,(error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // console.log(results);
        return res.render("laureatesByCategory", {
            category: listerCategory,
            // data:results
        });
    });
}

exports.addLaureateForm = (req, res) => {
    nobelsService.listerCategoryNobels(req, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // console.log(results);
        return res.render("addLaureateForm", {
            category: listerCategory,
            // data:results
        });
    });
}