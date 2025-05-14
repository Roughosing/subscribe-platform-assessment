const { CATEGORIES } = require('../config/constants');

const isValidNumber = (number) => !isNaN(number) && number > 0;

const validateQuantity = (input) => {
    const quantity = parseInt(input);
    if (!isValidNumber(quantity)) {
      return { valid: false, message: 'Quantity must be a positive number' };
    }
    return { valid: true, value: quantity };
};

const validateName = (input) => {
    const name = input.trim();
    if (name.length === 0) {
      return { valid: false, message: 'Name cannot be empty' };
    }
    return { valid: true, value: name };
};

const validatePrice = (input) => {
    const price = parseFloat(input);
    if (!isValidNumber(price)) {
      return { valid: false, message: 'Price must be a positive number' };
    }
    return { valid: true, value: price };
};

const validateCategory = (input) => {
    const category = input.toLowerCase();
    if (!CATEGORIES.ALL.includes(category)) {
      return {
        valid: false,
        message: `Category must be one of: ${CATEGORIES.ALL.join(', ')}`
      };
    }
    return { valid: true, value: category };
};

module.exports = {
    validateQuantity,
    validateName,
    validatePrice,
    validateCategory
};
