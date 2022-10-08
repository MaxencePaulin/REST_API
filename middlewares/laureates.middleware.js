const validator = require('validator');

exports.validateCategory = (category, year, prizes) => {
    if(validator.isEmpty(category)){
        return false;
    }
    if(prizes) {
        const result = [];
        prizes.forEach((prize) => {
            if(prize.year === year && prize.category === category){
                result.push(prize);
            }
        });
        return result.length > 0;
    }
    return category != -1;

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