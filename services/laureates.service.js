const fs = require("fs");
const {validateCategory, validateYear,
    validateMotivation,
    validateSurname, validateFirstname} = require("../middlewares/laureates.middleware");

const lirePrizes = () => {
    try {
        const dataBuffer = fs.readFileSync("prize.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON).prizes;
    } catch (e) {
        return [];
    }
};

const savePrizes = (prizes) => {
    const dataJSON = JSON.stringify({prizes: prizes});
    fs.writeFileSync("prize.json", dataJSON);
};

const lireLaureates = (prizesL) => {
    const laureatesL = [];
    prizesL.forEach((prize) => {
            if (prize.laureates){  
                prize.laureates.forEach((laureate) => {
                    let tmp = laureatesL.find((l) => l.id === laureate.id);
                    if (!tmp) {
                        laureatesL.push({
                            id: laureate.id,
                            firstname: laureate.firstname,
                            surname: laureate.surname
                        });
                    }
                });
            } 
    });
    return laureatesL;
} 

// F1 et F4 ?
const listerLaureats = (callback) => {
    try {
        const prizesL = lirePrizes();
        const laureatesL = lireLaureates(prizesL);
        if (laureatesL.length === 0) {
            return callback("No result", null);
        }
        return callback(null, laureatesL);
    } catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
};

// F2
const lireIdLaureats = (id, callback) => {
    try {
        const prizesL = lirePrizes();
        const laureatesL = lireLaureates(prizesL);
        const result = [];
        laureatesL.forEach((laureate) => {
            if (laureate.id === id) {
                result.push(laureate);
            }
        });
        if (result[0] == null) {
            return callback("Not found, please enter a valid id (integer) if you search a laureate", null);
        }
        return callback(null, result);
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
            if(r.nbNobel > 1){
                result.push({
                    firstname: r.firstname,
                    surname: r.surname,
                    nbNobel: r.nbNobel
                });
            }
        });
        if (result.length === 0) {
            return callback("No result", null);
        }
        return callback(null, result);
    }catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
}

// F12
const filterLaureats = (firstname, surname, category, callback) => {
    try {
        const prizes = lirePrizes();
        let result = [];
        prizes.forEach((prize) => {
            if (prize.laureates){  
                prize.laureates.forEach((laureate) => {
                    let tmp = result.find((l) => l.id === laureate.id);
                    if (!tmp) {
                        if ((laureate.firstname != null && laureate.firstname === firstname)
                            || (laureate.surname !=null && laureate.surname === surname)
                            || (prize.category !=null &&  prize.category === category)) {
                            result.push(laureate);
                        }
                    }
                });
            } 
        });
        console.log(result);
        if (result.length === 0) {
            return callback("No result or invalid parameter, do"
                +" filter?firstname=test or filter?surname=test"
                +" or filter?category=medicine with valid values", null);
        }
        return callback(null, result);
    }catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
}


// F13

const deleteLaureats = (id, year, category, callback) => {
    try {
        const prizes = lirePrizes();
        const removeLaureate = [];
        let tot = 0;
        let count=0;
        if (!id || !year || !category) {
            return callback("You can only delete a laureate by id, year, and category", null);
        }
        const result = [];
        prizes.forEach((prize) => {
            if (prize.laureates){
                prize.laureates.forEach((laureate) => {
                    if (result.find((p) => p.year === prize.year && p.category === prize.category) == null) {
                        if (laureate.id !== id || prize.year !== year || prize.category !== category) {
                            result.push({
                                year: prize.year,
                                category: prize.category,
                                laureates: [laureate]
                            });
                        } else {
                            removeLaureate.push(laureate);
                        }
                        tot++;
                    } else if (result.find((p) => p.year === prize.year && p.category === prize.category)){
                        if (laureate.id !== id || prize.year !== year || prize.category !== category) {
                            result.forEach((p) => {
                                if (p.year === prize.year && p.category === prize.category) {
                                    p.laureates.push(laureate);
                                }
                            });
                        } else {
                            removeLaureate.push(laureate);
                        }
                        tot++;
                    }
                });
            }
        });
        result.forEach((p) => {
            if (p.laureates) {
                p.laureates.forEach((l) => {
                    count++
                });
            }
        });
        if (count === tot) {
            return callback("Laureate doesn't exist or don't match with these parameters", null);
        }
//        savePrizes(result);
        return callback(null, removeLaureate);
    }catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
}

const editMotivationLaureats = (motivation, id, year, category, callback) => {
    try {
        const prizes = lirePrizes();
        if (!motivation || !id || !year || !category) {
            return callback("You can only edit motivation of a laureate by id, year, and category", null);
        }
        const result = [];
        prizes.forEach((prize) => {
            if (prize.laureates){
                prize.laureates.forEach((laureate) => {
                    if (laureate.id === id && prize.year === year && prize.category === category) {
                        laureate.motivation = "\""+motivation+"\"";
                        result.push(laureate);
                    }
                });
            }
        });
        if (result.length === 0) {
            return callback("Laureate not found (doesn't exist or doesn't match with these parameters)", null);
        }
//        savePrizes(prizes);
        return callback(null, result);
    }catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
}

// F15
const addLaureats = (firstname, surname, motivation, share, year, category, callback) => {
    try {
        const prizes = lirePrizes();
        if (!validateFirstname(firstname) || !validateSurname(surname) || !validateMotivation(motivation) || !validateYear(year, prizes) || !validateCategory(category, year, prizes)) {
            return callback("You can only add a laureate with firstname (3 char min), surname (3 char min), motivation not empty, year already exist, category exist and match with this year", null);
        }
        firstname = firstname.charAt(0).toUpperCase() + firstname.toLowerCase().slice(1);
        surname = surname.charAt(0).toUpperCase() + surname.toLowerCase().slice(1);
        let id = null;
        let maxId = 0;
        let newId;
        const result = [];
        const verif = [];
        let stop = false;
        const laureatesL = lireLaureates(prizes);
        prizes.forEach((prize) => {
            result.push(prize);
        });
        laureatesL.forEach((laureate) => {
            if (parseInt(laureate.id) > maxId) {
                maxId = laureate.id;
            }
            if (laureate.firstname.toLowerCase() === firstname.toLowerCase() && laureate.surname.toLowerCase() === surname.toLowerCase()) {
                id = laureate.id;
            }
        });
        if (id === null) {
            maxId++;
            newId = maxId.toString();
            result.forEach((prize) => {
                if (prize.year === year && prize.category === category){
                    if (prize.laureates && !stop){
                        prize.laureates.push({
                            id: newId, 
                            firstname: firstname, 
                            surname: surname, 
                            motivation: "\""+motivation+"\"",
                            share: share
                        });
                        verif.push({
                            id: newId,
                            firstname: firstname, 
                            surname: surname, 
                            motivation: "\""+motivation+"\"",
                            share: share
                        });
                        stop = true;
                    } else if (!prize.laureates && !stop) {
                        Reflect.deleteProperty(prize, "overallMotivation");
                        // push une nouvelle propriété laureates dans prize
                        prize.laureates = [{
                            id: newId,
                            firstname: firstname,
                            surname: surname,
                            motivation: "\"" + motivation + "\"",
                            share: share
                        }];
                        verif.push({
                            id: newId,
                            firstname: firstname,
                            surname: surname,
                            motivation: "\"" + motivation + "\"",
                            share: share
                        });
                        stop = true;
                    }
                }
            });
        }else if (id != null) {
            result.forEach((prize) => {
                if (prize.year === year && prize.category === category){
                    if (prize.laureates && !stop){
                        prize.laureates.forEach((laureate) => {
                            if ((laureate.id === id) && !stop) {
                                laureate.motivation = "\""+motivation+"\"";
                                if (share != null) {
                                    laureate.share = share;
                                }
                                verif.push({
                                    id: id, 
                                    firstname: laureate.firstname,
                                    surname: laureate.surname,
                                    motivation: "\""+motivation+"\"",
                                    share: share
                                });
                                stop = true;
                            } else if ((laureate.id !== id) && !stop){
                                prize.laureates.push({
                                    id: id,
                                    firstname: firstname,
                                    surname: surname,
                                    motivation: "\""+motivation+"\"",
                                    share: share
                                });
                                verif.push({
                                    id: id,
                                    firstname: firstname,
                                    surname: surname,
                                    motivation: "\""+motivation+"\"",
                                    share: share
                                });
                                stop = true;
                            }
                        });
                    } else if (!prize.laureates && !stop){
                        Reflect.deleteProperty(prize,"overallMotivation");
                        // push une nouvelle propriété laureates dans prize
                        prize.laureates = [{
                            id: id,
                            firstname: firstname,
                            surname: surname,
                            motivation: "\""+motivation+"\"",
                            share: share
                        }];
                        verif.push({
                            id: id,
                            firstname: firstname,
                            surname: surname,
                            motivation: "\""+motivation+"\"",
                            share: share
                        });
                        stop = true;
                    }
                }
            });
        }
        if (verif.length === 0) {
            return callback("Can't create laureates with these paramater (year or category invalid)", null);
        }
        // savePrizes(result);
        return callback(null, verif);
    }catch (e){
        console.log("error addLaureats");
        console.log(e);
        return callback([], null);
    }
}

module.exports = {
    listerLaureats: listerLaureats,
    lireIdLaureats: lireIdLaureats,
    numberMore1Nobel: numberMore1Nobel,
    filterLaureats: filterLaureats,
    deleteLaureats: deleteLaureats,
    editMotivationLaureats: editMotivationLaureats,
    addLaureats: addLaureats
}