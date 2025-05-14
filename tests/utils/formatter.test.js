const { formatCurrency, formatReceipt } = require('../../src/utils/formatter');

describe('Formatting Utils', () => {
  describe('formatCurrency', () => {
    test('formats to 2 decimal places', () => {
      expect(formatCurrency(10)).toBe('10.00');
      expect(formatCurrency(10.5)).toBe('10.50');
      expect(formatCurrency(10.55)).toBe('10.55');
    });

    test('handles zero', () => {
      expect(formatCurrency(0)).toBe('0.00');
    });

    test('handles many decimal places', () => {
      expect(formatCurrency(10.123456)).toBe('10.12');
    });
  });

  describe('formatReceipt', () => {
    test('formats a complete receipt correctly', () => {
      const receipt = {
        items: [
          { quantity: 2, name: 'book', totalPrice: 24.98 },
          { quantity: 1, name: 'music CD', totalPrice: 16.49 }
        ],
        salesTax: 1.50,
        total: 42.32
      };

      const expected = [
        '\n--- Receipt ---',
        '2 book: 24.98',
        '1 music CD: 16.49',
        'Sales Taxes: 1.50',
        'Total: 42.32'
      ].join('\n');

      expect(formatReceipt(receipt)).toBe(expected);
    });

    test('handles empty receipt', () => {
      const receipt = {
        items: [],
        salesTax: 0,
        total: 0
      };

      const expected = [
        '\n--- Receipt ---',
        'Sales Taxes: 0.00',
        'Total: 0.00'
      ].join('\n');

      expect(formatReceipt(receipt)).toBe(expected);
    });
  });
}); 