const { validateQuantity, validatePrice, validateCategory } = require('../../src/utils/validator');

describe('Validation Utils', () => {
  describe('validateQuantity', () => {
    test('accepts valid positive integers', () => {
      expect(validateQuantity('1')).toEqual({ valid: true, value: 1 });
      expect(validateQuantity('42')).toEqual({ valid: true, value: 42 });
    });

    test('rejects negative numbers', () => {
      expect(validateQuantity('-1')).toEqual({
        valid: false,
        message: 'Quantity must be a positive number'
      });
    });

    test('rejects zero', () => {
      expect(validateQuantity('0')).toEqual({
        valid: false,
        message: 'Quantity must be a positive number'
      });
    });

    test('rejects non-numeric input', () => {
      expect(validateQuantity('abc')).toEqual({
        valid: false,
        message: 'Quantity must be a positive number'
      });
    });
  });

  describe('validatePrice', () => {
    test('accepts valid positive numbers', () => {
      expect(validatePrice('10.00')).toEqual({ valid: true, value: 10.00 });
      expect(validatePrice('0.99')).toEqual({ valid: true, value: 0.99 });
      expect(validatePrice('5')).toEqual({ valid: true, value: 5 });
    });

    test('rejects negative numbers', () => {
      expect(validatePrice('-10.00')).toEqual({
        valid: false,
        message: 'Price must be a positive number'
      });
    });

    test('rejects zero', () => {
      expect(validatePrice('0')).toEqual({
        valid: false,
        message: 'Price must be a positive number'
      });
    });

    test('rejects non-numeric input', () => {
      expect(validatePrice('abc')).toEqual({
        valid: false,
        message: 'Price must be a positive number'
      });
    });
  });

  describe('validateCategory', () => {
    test('accepts valid categories', () => {
      expect(validateCategory('book')).toEqual({ valid: true, value: 'book' });
      expect(validateCategory('food')).toEqual({ valid: true, value: 'food' });
      expect(validateCategory('medical')).toEqual({ valid: true, value: 'medical' });
      expect(validateCategory('other')).toEqual({ valid: true, value: 'other' });
    });

    test('accepts categories in any case', () => {
      expect(validateCategory('BOOK')).toEqual({ valid: true, value: 'book' });
      expect(validateCategory('Food')).toEqual({ valid: true, value: 'food' });
    });

    test('rejects invalid categories', () => {
      expect(validateCategory('invalid')).toEqual({
        valid: false,
        message: 'Category must be one of: book, food, medical, other'
      });
    });
  });
}); 