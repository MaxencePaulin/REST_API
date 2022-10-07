const {validator} = require('validator');
const {lirePrizes} = require("../services/laureates.service");

exports.validateCategory = (category) => {
    if(validator.isEmpty(category)){
        return false;
    }
    return category != -1;

}

exports.validateYear = (year) => {
    if(validator.isEmpty(year)){
        return false;
    }
    const yearPrizes = [];
    const prizes = lirePrizes();
    prizes.forEach((prize) => {
        if (prize.year) {
            yearPrizes.push(prize.year);
        }
    });
    return yearPrizes.includes(year);
}

exports.validateFirstname = (firstname) => {
    if(validator.isEmpty(firstname)){
        return false;
    }
    return firstname.length >= 3;

}

exports.validateSurname = (surname) => {
    if(validator.isEmpty(surname)){
        return false;
    }
    return surname.length >= 3;

}

exports.validateMotivation = (motivation) => {
    return !validator.isEmpty(motivation);

}