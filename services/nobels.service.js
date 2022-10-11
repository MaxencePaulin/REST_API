const fs = require("fs");

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
    return {page: page, limit: limit, nbPage: nbPage,
        totalResult: totalResult, result: result};
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

const listerCategory = () => {
    try {
        const prizes = lirePrizes();
        // const result = [];
        // prizes.forEach((prize) => {
        //     if (prize.category) {
        //         let tmp = result.find((c) => c === prize.category);
        //         if (!tmp) {
        //             result.push(prize.category);
        //         }
        //     }
        // });
        const category = prizes.map((prize) => prize.category);
        return  [...new Set(category)];
    }catch (e) {
        console.log("error listerCategory");
        console.log(e);
        return null;
    }
}

// F6
const listerCategoryNobels = (req, callback) => {
    try {
        const result = listerCategory();
        if (!result || result.length === 0) {
            return callback("No category", null);
        }
        const finalResult = pagination(req, result);
        if (finalResult.length === 0) {
            return callback(`No result on page ${req.query.page}`, null);
        }
        return callback(null, finalResult);
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

// F8 && F11
// Pour chaque année, indiquez combien de lauréats avaient remporté un prix nobel.
// Possibilité de sort laureates ou -laureates pour trier par ordre ascendant ou descendant
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
        if (req.query.sort === "laureates") {
            result.sort((a, b) => a.nbLaureates - b.nbLaureates);
        } else if (req.query.sort === "-laureates") {
            result.sort((a, b) => b.nbLaureates - a.nbLaureates);
        }
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
        if (finalResult.length === 0) {
            return callback("No result", null);
        }
        return callback(null, finalResult);
    }catch (e) {
        console.log("error listerAnneeSansNobel");
        console.log(e);
        return callback([], null);
    }
}

// vues
const allPrizes = (category, callback) => {
    try {
        const dataBuffer = fs.readFileSync("prize.json");
        const dataJSON = dataBuffer.toString();
        const prizes = JSON.parse(dataJSON).prizes;
        const resultCat = [];
        if (category) {
            prizes.forEach((prize) => {
                if (prize.category === category) {
                    if (prize.laureates) {
                        prize.laureates.forEach((laureate) => {
                            resultCat.push(prize);
                            // resultCat.push({
                            //     firstname: laureate.firstname,
                            //     surname: laureate.surname,
                            //     year: prize.year
                            // });
                        });
                    }
                }
            });
            return callback(null, {totalResult: resultCat.length, result: resultCat});
        }
        return callback(null, {totalResult: prizes.length, result: prizes});
    } catch (e) {
        console.log("error allPrizes");
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
    listerCategory: listerCategory,
    allPrizes: allPrizes
}