const fs = require("fs");

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
    const dataJSON = JSON.stringify(prizes);
    fs.writeFileSync("prize.json", dataJSON);
};

const lireLaureates = (prizesL) => {
    const laureatesL = [];
    prizesL.forEach((prize) => {
            if (prize.laureates){  
                prize.laureates.forEach((laureate) => {
                    laureatesL.push({
                        id: laureate.id,
                        firstname: laureate.firstname,
                        surname: laureate.surname
                    });
                });
            } 
    });
    return laureatesL;
        
} 

const listerLaureats = (callback) => {
    try {
        const prizesL = lirePrizes();
        const laureatesL = lireLaureates(prizesL);
        return callback(null, laureatesL);
    } catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
};

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
            return callback([], null);
        }
        return callback(null, result);
    }catch (e) {
        console.log("error");
        console.log(e);
        return callback([], null);
    }
}

module.exports = {
    listerLaureats: listerLaureats,
    lireIdLaureats: lireIdLaureats
}