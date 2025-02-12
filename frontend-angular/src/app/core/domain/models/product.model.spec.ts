import {Product} from './product.model';

describe('Product', () => {
  describe('Constructor', () => {
    it('should create a Product instance with a valid date string and of category product', () => {
      const product = new Product(' Joint ', '2025-09-14', '2;8,4', 10);
      const product2 = new Product(' Joint ', '19/12/1993', '2;8,4', 10);
      const product3 = new Product(' Joint ', '19/12/1993', 4, 10);

      expect(product.name).toBe('Joint');
      expect(product.updated_at).toEqual(new Date('2025-09-14'));
      expect(product.prices).toEqual([2, 8.4]);
      expect(product.rate).toBe(10);
      expect(product.category).toBe('product');

      expect(product2.name).toBe('Joint');
      expect(product2.updated_at).toEqual(new Date('1993-12-19'));
      expect(product2.prices).toEqual([2, 8.4]);
      expect(product2.rate).toBe(10);
      expect(product2.category).toBe('product');

      expect(product3.name).toBe('Joint');
      expect(product3.updated_at).toEqual(new Date('1993-12-19'));
      expect(product3.prices).toEqual([4]);
      expect(product3.rate).toBe(10);
      expect(product3.category).toBe('product');
    });

    it('should create a Product instance with a valid date string and of category equipment', () => {
      const product = new Product(' Equipment1 ', '2025-09-14', '2;8,4', 10);

      expect(product.name).toBe('Equipment1');
      expect(product.updated_at).toEqual(new Date('2025-09-14'));
      expect(product.prices).toEqual([2, 8.4]);
      expect(product.rate).toBe(10);
      expect(product.category).toBe('equipment');
    });

    it('should create a Product instance with a valid Excel serial date', () => {
      const product = new Product('Joint', 45914, '2;8,4', 10);

      expect(product.name).toBe('Joint');
      expect(product.updated_at).toEqual(new Date('2025-09-14'));
      expect(product.prices).toEqual([2, 8.4]);
      expect(product.rate).toBe(10);
      expect(product.category).toBe('product');
    });

    it('should throw an error for an Excel serial date less than 1', () => {
      const invalidExcelDate = 0;

      expect(() => {
        new Product('Joint', invalidExcelDate, '2;8,4', 10);
      }).toThrowError('Invalid Excel date received: 0');
    });

    it('should throw an error for an Excel serial date that results in an invalid Date', () => {
      const invalidExcelDate = 10000000000;

      expect(() => {
        new Product('Joint', invalidExcelDate, '2;8,4', 10);
      }).toThrowError('Invalid Excel date received: 10000000000');
    });

    it('should throw an error for an invalid date string', () => {
      const invalidDateString = 'invalid-date';

      expect(() => {
        new Product('Joint', invalidDateString, '2;8,4', 10);
      }).toThrowError('Invalid date string received: invalid-date');
    });

    it('should throw an error for an invalid prices string', () => {
      const invalidPricesString = 'invalid-prices';

      expect(() => {
        new Product('Joint', '2025-09-14', invalidPricesString, 10);
      }).toThrowError('Invalid price received: invalid-prices');
    });
  });
});
