const dotenv = require("dotenv");
dotenv.config();
// const datasource = process.env.DATASOURCE;
const laureatesService = require("../services/laureates-fs.service.js");

// GET 
exports.list = (req, res, next) => {
    laureatesService.listerLaureats((error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // 200 => OK
        var page = parseInt(req.params.page);
        var per_page = 6;
        var nbPage = parseInt(results.length/6)+1;
        var data = []; 
        var i = (page-1)*6;
        var j = i+6;
        for (i; i<j; i++) {
            if (results[i] != undefined) {
                data.push(results[i]); 
            }else {
                break;
            }
        } 
        if (data[0] == null) {
            const err=new Error("Not Found");
            return next(err);
        }
        return res.status(200).send({ success: 1, per_page: per_page, page: page, nbPage: nbPage, data: data });
    });
};
exports.afficheInfo = (req, res, next) => {
    const id = req.params.id;
    laureatesService.lireIdLaureats(id,(error, results) => {
        if (error) {
            const err = new Error("Id Not Found");
            return next(err);
            // return res.status(400).send({ success: 0, data: error });
        }
        console.log("Success");
        // 200 => OK
        return res.status(200).send({ success: 1, data: results });
    });

}