const fs = require("fs");
const { lireLaureates } = require("./laureates.service");

const pagination = (req, results) => {
    if (!req.query.page || req.query.page < 1) {
        req.query.page = 1;
    }
    if (!req.query.limit || req.query.limit < 1) {
        req.query.limit = 10;
    }
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = results.slice(startIndex, endIndex);
    if (result.length === 0) {
        return [];
    }
    const nbPage= Math.ceil(results.length / limit);
    const totalResult = results.length;
    const resultsPage = {page: page, limit: limit, nbPage: nbPage,
        totalResult: totalResult, result: result};
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
            if (prize.laureates) {
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

// F9
const afficheNobelsInfo = (req, callback) => {
    try {
        const id = req.params.id;
        const prizes = lirePrizes();
        const laureatesL = lireLaureates(prizes);
        const result = [];
        prizes.forEach((prize) => {
            if (prize.laureates) {
                prize.laureates.forEach((laureate) => {
                    if (laureate.id === id) {
                        var tmp = result.find((l) => l.id === laureate.id);
                        if (!tmp) {
                            result.push({
                                id: laureate.id,
                                name: [
                                    {
                                        firstname: laureate.firstname,
                                        surname: laureate.surname,
                                        prize: [prize.year+" "+prize.category+" "
                                            +laureate.motivation.slice(1, laureate.motivation.length-1)],
                                    }
                                ],
                                
                            });
                        } else {
                            // push le prize dans result
                            tmp.name[0].prize.push(prize.year+" "+prize.category+" "
                                +laureate.motivation.slice(1, laureate.motivation.length-1));
                        }
                    }
                });
            }
        });
        if (result.length === 0) {
            return callback("No result", null);
        }
        return callback(null, result[0]);
    }catch (e) {
        console.log("error afficheNobelsInfo");
        console.log(e);
        return callback([], null);
    }
}

// F10
const listerAnneeSansNobel = (req, callback) => {
    try {
        const prizes = lirePrizes();
        const result = [];
        prizes.forEach((prize) => {
            if (!prize.laureates) {
                let tmp = result.find((r) => r === prize.year);
                if (!tmp) {
                    let tmp2 = prizes.find((p) => p.year === prize.year && p.laureates);
                    if (!tmp2) {
                        result.push(prize.year);
                    }
                }
            }
        });
        const finalResult = pagination(req, result);
        return callback(null, finalResult);
    }catch (e) {
        console.log("error listerAnneeSansNobel");
        console.log(e);
        return callback([], null);
    }
}

// F11
const listerAnneeNobelAsc = (req, callback) => {
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
        result.sort((a, b) => a.nbLaureates - b.nbLaureates);
        const finalResult = pagination(req, result);
        return callback(null, finalResult);
    }catch (e) {
        console.log("error listerAnneeNobelAsc");
        console.log(e);
        return callback([], null);
    }
}

const listerAnneeNobelDesc = (req, callback) => {
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
        result.sort((a, b) => b.nbLaureates - a.nbLaureates);
        const finalResult = pagination(req, result);
        return callback(null, finalResult);
    }catch (e) {
        console.log("error listerAnneeNobelAsc");
        console.log(e);
        return callback([], null);
    }
}

module.exports = {
    listerNombreNobels: listerNombreNobels,
    listerCategoryNobels: listerCategoryNobels,
    listerCategoryNobelsMax: listerCategoryNobelsMax,
    listerNombreNobelsParAn: listerNombreNobelsParAn,
    afficheNobelsInfo: afficheNobelsInfo,
    listerAnneeSansNobel: listerAnneeSansNobel,
    listerAnneeNobelAsc: listerAnneeNobelAsc,
    listerAnneeNobelDesc: listerAnneeNobelDesc
}