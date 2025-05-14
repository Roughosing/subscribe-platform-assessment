const readline = require('readline');
const { validateQuantity, validateName, validatePrice, validateCategory } = require('./validator');
const { CATEGORIES } = require('../config/constants');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const getValidatedInput = async (prompt, validator) => {
  while (true) {
    const input = await askQuestion(prompt);
    const result = validator(input);
    if (result.valid) {
      return result.value;
    }
    console.log(`Error: ${result.message}`);
  }
};

const getItem = async () => {
  console.log('\n--- Enter Item Details ---');
  
  const quantity = await getValidatedInput('Enter quantity: ', validateQuantity);
  const name = await getValidatedInput('Enter item name: ', validateName);
  const price = await getValidatedInput('Enter price: ', validatePrice);
  const category = await getValidatedInput(`Enter category (${CATEGORIES.ALL.join('/')}): `, validateCategory);

  return { quantity, name, price, category };
};

const getShoppingBasket = async () => {
  const items = [];
  
  while (true) {
    items.push(await getItem());
    
    const again = await askQuestion('\nAdd another item? (y/n): ');
    if (again.toLowerCase() !== 'y') {
      break;
    }
  }
  
  return items;
};

const close = () => rl.close();

module.exports = {
  getShoppingBasket,
  close
}; 
