const readline = require('readline');
const { getShoppingBasket } = require('../../src/services/shoppingBasketService');

jest.mock('readline', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn(),
    close: jest.fn()
  })
}));

describe('ShoppingBasketService', () => {
  let mockReadline;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockReadline = readline.createInterface();
  });

  describe('getShoppingBasket', () => {
    it('should collect multiple items and return them as an array', async () => {
      mockReadline.question
        .mockImplementationOnce((_, cb) => cb('2')) // quantity
        .mockImplementationOnce((_, cb) => cb('book')) // name
        .mockImplementationOnce((_, cb) => cb('12.49')) // price
        .mockImplementationOnce((_, cb) => cb('book')) // category
        .mockImplementationOnce((_, cb) => cb('n')); // don't add another item

      const result = await getShoppingBasket();

      expect(result).toEqual([
        {
          quantity: 2,
          name: 'book',
          price: 12.49,
          category: 'book'
        }
      ]);
      expect(mockReadline.close).toHaveBeenCalled();
    });

    it('should handle multiple items when user wants to add more', async () => {
      mockReadline.question
        .mockImplementationOnce((_, cb) => cb('1')) // quantity
        .mockImplementationOnce((_, cb) => cb('music CD')) // name
        .mockImplementationOnce((_, cb) => cb('14.99')) // price
        .mockImplementationOnce((_, cb) => cb('other')) // category
        .mockImplementationOnce((_, cb) => cb('y')) // add another item

        .mockImplementationOnce((_, cb) => cb('1')) // quantity
        .mockImplementationOnce((_, cb) => cb('chocolate bar')) // name
        .mockImplementationOnce((_, cb) => cb('0.85')) // price
        .mockImplementationOnce((_, cb) => cb('food')) // category
        .mockImplementationOnce((_, cb) => cb('n')); // don't add another item

      const result = await getShoppingBasket();

      expect(result).toEqual([
        {
          quantity: 1,
          name: 'music CD',
          price: 14.99,
          category: 'other'
        },
        {
          quantity: 1,
          name: 'chocolate bar',
          price: 0.85,
          category: 'food'
        }
      ]);
      expect(mockReadline.close).toHaveBeenCalled();
    });
  });

  describe('input validation', () => {
    it('should re-prompt for invalid quantity until valid input is provided', async () => {
      mockReadline.question
        .mockImplementationOnce((_, cb) => cb('-1'))
        .mockImplementationOnce((_, cb) => cb('0'))
        .mockImplementationOnce((_, cb) => cb('abc'))
        .mockImplementationOnce((_, cb) => cb('1'))

        .mockImplementationOnce((_, cb) => cb('book'))
        .mockImplementationOnce((_, cb) => cb('12.49'))
        .mockImplementationOnce((_, cb) => cb('book'))
        .mockImplementationOnce((_, cb) => cb('n'));

      const result = await getShoppingBasket();

      expect(result[0].quantity).toBe(1);
      expect(mockReadline.question).toHaveBeenCalledTimes(8);
    });

    it('should re-prompt for invalid price until valid input is provided', async () => {
      mockReadline.question
        .mockImplementationOnce((_, cb) => cb('1'))
        .mockImplementationOnce((_, cb) => cb('book'))

        .mockImplementationOnce((_, cb) => cb('-1.99'))
        .mockImplementationOnce((_, cb) => cb('abc'))
        .mockImplementationOnce((_, cb) => cb('12.49'))

        .mockImplementationOnce((_, cb) => cb('book'))
        .mockImplementationOnce((_, cb) => cb('n'));

      const result = await getShoppingBasket();

      expect(result[0].price).toBe(12.49);
      expect(mockReadline.question).toHaveBeenCalledTimes(7);
    });

    it('should re-prompt for invalid category until valid input is provided', async () => {
      mockReadline.question
        .mockImplementationOnce((_, cb) => cb('1'))
        .mockImplementationOnce((_, cb) => cb('item'))
        .mockImplementationOnce((_, cb) => cb('10.00'))

        .mockImplementationOnce((_, cb) => cb('invalid'))
        .mockImplementationOnce((_, cb) => cb('not-a-category'))
        .mockImplementationOnce((_, cb) => cb('book'))
        .mockImplementationOnce((_, cb) => cb('n'));

      const result = await getShoppingBasket();

      expect(result[0].category).toBe('book');
      expect(mockReadline.question).toHaveBeenCalledTimes(7);
    });
  });
}); 