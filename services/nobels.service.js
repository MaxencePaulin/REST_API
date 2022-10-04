const fs = require("fs");

const pagination = (req, results) => {
    if (!req.query.page || req.query.page < 1) {
        req.query.page = 1;
    }
    if (!req.query.limit || req.query.limit < 1) {
        req.query.limit = 10;
    }
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const resultsPage = results.slice(startIndex, endIndex);
    return resultsPage;
}

const lirePrizes = () => {
    try {
        const dataBuffer = fs.readFileSync("prize.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON).prizes;
    } catch (e) {
        return [];
    }
};

// F3
const listerNombreNobels = (callback) => {
    try {
        const prizes = lirePrizes();
        const result = [];
        prizes.forEach((prize) => {
            if (prize.laureates) {
                result.push({
                    year: prize.year,
                    category: prize.category,
                });
            }
        });
        return callback(null, result.length);
    }catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
}

// F5
const numberMore1Nobel = (callback) => {
    try {
        const prizes = lirePrizes();
        const laureatesL = [];
        const temp = [];
        const result = [];
        // console.log(prizes.filter((prize) => {return prize.laureates.id === "6"}));
        prizes.forEach((prize => {
            if (prize.laureates) {
                prize.laureates.forEach((laureate) => {
                    laureatesL.push(laureate);

                });
            }
        }));
        laureatesL.forEach((laureate) =>{
            let tmp = temp.find((l) => l.id === laureate.id);
            let occ = laureatesL.filter(l => l.id===laureate.id).length;
            if (!tmp) {
                temp.push({
                    id: laureate.id,
                    firstname: laureate.firstname,
                    surname: laureate.surname,
                    nbNobel: occ
                });
            }
        });
        temp.forEach((r) => {
            result.push({
                firstname: r.firstname,
                surname: r.surname,
                nbNobel: r.nbNobel
            })
        } )
        return callback(null, result);
    }catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
}

// F6
const listerCategoryNobels = (callback) => {
    try {
        const prizes = lirePrizes();
        const result = [];
        prizes.forEach((prize) => {
            if (prize.category) {
                let tmp = result.find((c) => c === prize.category);
                if (!tmp) {
                    result.push(prize.category);
                }
            }
        });
        return callback(null, result);
    }catch (e) {
        console.log("error listerCategoryNobels");
        console.log(e);
        return callback([], null);
    }
}

// F7
// Déterminez quelle catégorie a produit le plus grand nombre de lauréats du prix Nobel.
const listerCategoryNobelsMax = (callback) => {
    try {
        const prizes = lirePrizes();
        const result = [];
        prizes.forEach((prize) => {
            if (prize.category && prize.laureates) {
                let tmp = result.find((c) => c.category === prize.category);
                if (!tmp) {
                    result.push({
                        category: prize.category,
                        nbLaureates: prize.laureates.length
                    });
                } else {
                    tmp.nbLaureates += prize.laureates.length;
                }
            }
        });
        let max = result[0];
        result.forEach((r) => {
            if (r.nbLaureates > max.nbLaureates) {
                max = r;
            }
        });
        return callback(null, max);
    }catch (e) {
        console.log("error listerCategoryNobelsMax");
        console.log(e);
        return callback([], null);
    }
}

// F8
// Pour chaque année, indiquez combien de lauréats avaient remporté un prix nobel.
const listerNombreNobelsParAn = (req, callback) => {
    try {
        const prizes = lirePrizes();
        const result = [];
        prizes.forEach((prize) => {
            if (prize.laureates) {
                let tmp = result.find((r) => r.year === prize.year);
                if (!tmp) {
                    result.push({
                        year: prize.year,
                        nbLaureates: prize.laureates.length
                    });
                } else {
                    tmp.nbLaureates += prize.laureates.length;
                }
            }
        });
        const finalResult = pagination(req, result);
        if (finalResult.length === 0) {
            return callback("No result", null);
        }
        return callback(null, finalResult);
    }catch (e) {
        console.log("error listerNombreNobelsParAn");
        console.log(e);
        return callback([], null);
    }
}

module.exports = {
    listerNombreNobels: listerNombreNobels,
    numberMore1Nobel: numberMore1Nobel,
    listerCategoryNobels: listerCategoryNobels,
    listerCategoryNobelsMax: listerCategoryNobelsMax,
    listerNombreNobelsParAn: listerNombreNobelsParAn
}