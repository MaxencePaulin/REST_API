const validator = require('validator');

exports.validateCategory = (category, year, prizes) => {
    if(validator.isEmpty(category)){
        return false;
    }
    if(prizes && year) {
        const result = [];
        prizes.forEach((prize) => {
            if(prize.year === year && prize.category === category){
                result.push(prize);
            }
        });
        return result.length > 0;
    }
    if (prizes) {
        const result = [];
        prizes.forEach((prize) => {
            if(prize.category === category){
                result.push(prize);
            }
        });
        return result.length > 0;
    }
    return true;

}

exports.validateYear = (year, prizes) => {
    if(validator.isEmpty(year)){
        return false;
    }
    if(prizes) {
        const yearPrizes = [];
        prizes.forEach((prize) => {
            if (prize.year) {
                yearPrizes.push(prize.year);
            }
        });
        return yearPrizes.includes(year);
    }
    return true;
}

exports.validateFirstname = (firstname) => {
    if(validator.isEmpty(firstname)){
        return false;
    }
    return firstname.length > 3;

}

exports.validateSurname = (surname) => {
    if(validator.isEmpty(surname)){
        return false;
    }
    return surname.length > 3;

}

exports.validateMotivation = (motivation) => {
    return !validator.isEmpty(motivation);
}

exports.validateShare = (share) => {
    if(typeof share === 'undefined' || share === null || share === ''){
        return true;
    }
    return validator.isInt(share) && share > 0;
}

exports.validateId = (id, prizes) =>  {
    if(validator.isEmpty(id)){
        return false;
    }
    if(prizes) {
        const result = [];
        prizes.forEach((prize) => {
            if (prize.laureates) {
                prize.laureates.forEach((laureate) => {
                    if(laureate.id === id){
                        result.push(laureate);
                    }
                });
            }
        });
        return result.length > 0;
    }
    return true;
}