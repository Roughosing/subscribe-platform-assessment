const { calculateTaxes } = require('../../src/services/taxCalculator');

describe('Sales Tax Calculator', () => {
  const INPUT_1 = [
    { quantity: 2, name: 'book', price: 12.49, category: 'book' },
    { quantity: 1, name: 'music CD', price: 14.99, category: 'other' },
    { quantity: 1, name: 'chocolate bar', price: 0.85, category: 'food' }
  ];

  const INPUT_2 = [
    { quantity: 1, name: 'imported box of chocolates', price: 10.00, category: 'food' },
    { quantity: 1, name: 'imported bottle of perfume', price: 47.50, category: 'other' }
  ];

  const INPUT_3 = [
    { quantity: 1, name: 'imported bottle of perfume', price: 27.99, category: 'other' },
    { quantity: 1, name: 'bottle of perfume', price: 18.99, category: 'other' },
    { quantity: 1, name: 'packet of headache pills', price: 9.75, category: 'medical' },
    { quantity: 3, name: 'imported boxes of chocolates', price: 11.25, category: 'food' }
  ];

  test('Input 1: Basic sales tax calculation', () => {
    const receipt = calculateTaxes(INPUT_1);
    
    expect(receipt.items[0].totalPrice).toBeCloseTo(24.98, 2);
    expect(receipt.items[1].totalPrice).toBeCloseTo(16.49, 2);
    expect(receipt.items[2].totalPrice).toBeCloseTo(0.85, 2);
    
    expect(receipt.salesTax).toBeCloseTo(1.50, 2);
    expect(receipt.total).toBeCloseTo(42.32, 2);
  });

  test('Input 2: Imported items calculation', () => {
    const receipt = calculateTaxes(INPUT_2);
    
    expect(receipt.items[0].totalPrice).toBeCloseTo(10.50, 2);
    expect(receipt.items[1].totalPrice).toBeCloseTo(54.65, 2);
    
    expect(receipt.salesTax).toBeCloseTo(7.65, 2);
    expect(receipt.total).toBeCloseTo(65.15, 2);
  });

  test('Input 3: Mixed items with imports calculation', () => {
    const receipt = calculateTaxes(INPUT_3);
    
    expect(receipt.items[0].totalPrice).toBeCloseTo(32.19, 2);
    expect(receipt.items[1].totalPrice).toBeCloseTo(20.89, 2);
    expect(receipt.items[2].totalPrice).toBeCloseTo(9.75, 2);
    expect(receipt.items[3].totalPrice).toBeCloseTo(35.55, 2);
    
    expect(receipt.salesTax).toBeCloseTo(7.90, 2);
    expect(receipt.total).toBeCloseTo(98.38, 2);
  });

  test('Exempt items should not have basic sales tax', () => {
    const input = [
      { quantity: 1, name: 'book', price: 10.00, category: 'book' }
    ];
    const receipt = calculateTaxes(input);
    expect(receipt.salesTax).toBeCloseTo(0.00, 2);
  });

  test('Imported exempt items should only have import duty', () => {
    const input = [
      { quantity: 1, name: 'imported chocolate bar', price: 10.00, category: 'food' }
    ];
    const receipt = calculateTaxes(input);
    expect(receipt.salesTax).toBeCloseTo(0.50, 2);
  });

  test('Multiple quantity items should calculate tax correctly', () => {
    const input = [
      { quantity: 3, name: 'imported boxes of chocolates', price: 11.25, category: 'food' }
    ];
    const receipt = calculateTaxes(input);
    expect(receipt.items[0].totalPrice).toBeCloseTo(35.55, 2);
  });
});
