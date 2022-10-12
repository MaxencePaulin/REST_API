const dotenv = require("dotenv");
dotenv.config();
// const datasource = process.env.DATASOURCE;
const laureatesService = require("../services/laureates.service.js");
const {pagination} = require("../utils/page");

// GET 
exports.list = (req, res) => {
    if (req.params.id && (typeof req.params.id != 'undefined'
        && req.params.id !== "{id}"
        && req.params.id !== "undefined")) {
        const id = req.params.id;
        laureatesService.lireIdLaureats(id,(error, results) => {
            if (error) {
                return res.status(400).send({ success: 0, data: error });
            }
            console.log("Success");
            // 200 => OK
            return res.status(200).send({ success: 1, data: results });
        });
    }
    else {
        laureatesService.listerLaureats((error, results) => {
            if (error) {
                return res.status(400).send({ success: 0, data: error });
            }
            console.log("Success");
            // 200 => OK
            results = pagination(req, results);
            if (results.length === 0) {
                return res.status(400).send({ success: 0, data: "Aucun résultat avec cette page" });
            }
            return res.status(200).send({ success: 1, data: results });
        });
    }
};
// exports.afficheInfo = (req, res, next) => {
//     if (!req.params.id) {
//         return res.status(400).send({ success: 0, data: "Veuillez entrer un id" });
//     }
//     const id = req.params.id;
//     laureatesService.lireIdLaureats(id,(error, results) => {
//         if (error) {
//             return res.status(400).send({ success: 0, data: error });
//         }
//         console.log("Success");
//         // 200 => OK
//         return res.status(200).send({ success: 1, data: results });
//     });
// };

exports.severalNobels = (req, res) => {
    laureatesService.numberMore1Nobel((error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        results = pagination(req, results);
        if (results.length === 0) {
            return res.status(400).send({ success: 0, data: "Aucun résultat avec cette page" });
        }
        return res.status(200).send({ success: 1, data: results});
    });
};

exports.laureatesFilter = (req, res) => {
    const firstname = req.query.firstname;
    const surname = req.query.surname;
    const category = req.query.category;
    laureatesService.filterLaureats(firstname, surname, category, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        results = pagination(req, results);
        if (results.length === 0) {
            return res.status(400).send({ success: 0, data: "Aucun résultat avec cette page" });
        }
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.deleteLaureates = (req, res) => {
    const id = req.query.id;
    const year = req.query.year;
    const category = req.query.category;
    laureatesService.deleteLaureats(id, year, category, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.editMotivationLaureates = (req, res) => {
    const motivation = req.query.motivation;
    const id = req.query.id;
    const year = req.query.year;
    const category = req.query.category;
    laureatesService.editMotivationLaureats(motivation, id, year, category, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
}

exports.addLaureates = (req, res) => {
    const firstname = req.query.firstname;
    const surname = req.query.surname;
    const motivation = req.query.motivation;
    const share = req.query.share;
    const year = req.query.year;
    const category = req.query.category;
    laureatesService.addLaureats(firstname, surname, motivation, share, 
            year, category, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        return res.status(200).send({ success: 1, data: results});
    });
}