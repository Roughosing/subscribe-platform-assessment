const { getShoppingBasket } = require('./services/shoppingBasketService');
const { calculateTaxes } = require('./services/taxCalculator');
const { formatReceipt } = require('./utils/formatter');

async function main() {
  try {
    console.log('Welcome to Sales Tax Calculator');
    console.log('Please enter your shopping basket items');
    
    const items = await getShoppingBasket();
    const receipt = calculateTaxes(items);
    console.log(formatReceipt(receipt));
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main()
