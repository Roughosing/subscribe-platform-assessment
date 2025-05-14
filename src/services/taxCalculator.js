const { TAX_RATES, CATEGORIES } = require('../config/constants');

const isExempt = (category) => CATEGORIES.EXEMPT.includes(category);

const isImported = (name) => name.toLowerCase().includes('imported');

const roundTaxToNearestFiveCents = (amount) => {
  return Math.ceil(amount * 20) / 20;
};

const calculateItemTax = (item) => {
  let tax = 0;
  const { price, category, name } = item;

  if (!isExempt(category)) {
    tax += roundTaxToNearestFiveCents(price * TAX_RATES.BASIC);
  }

  if (isImported(name)) {
    tax += roundTaxToNearestFiveCents(price * TAX_RATES.IMPORT);
  }

  return tax;
};

const calculateTaxes = (items) => {
  let totalSalesTax = 0;
  let total = 0;
  const itemsWithTax = [];

  items.forEach(item => {
    const itemTax = calculateItemTax(item);
    const itemTotal = item.price + itemTax;
    
    totalSalesTax += itemTax * item.quantity;
    total += itemTotal * item.quantity;
    
    itemsWithTax.push({
      quantity: item.quantity,
      name: item.name,
      totalPrice: itemTotal * item.quantity
    });
  });

  return {
    items: itemsWithTax,
    salesTax: totalSalesTax,
    total
  };
};

module.exports = {
  calculateTaxes
};
