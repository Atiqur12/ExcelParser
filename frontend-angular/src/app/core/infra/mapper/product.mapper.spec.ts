import {Product} from '../../domain/models/product.model';
import {TestBed} from '@angular/core/testing';
import {ProductMapper} from './product.mapper';

describe('ProductMapper', () => {
  let service: ProductMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMapper);
  });

  it('should keep only last occurrence of name in product list when duplicate product', () => {
    const products = [
      new Product(' Joint ', '2021-09-14', '2;8,4', 10),
      new Product(' Joint ', '2025-09-14', '1', 4)
    ];
    const expectedList = [
      {name: 'Joint', updated_at: '2025-09-14', prices: [1], rate: 4, category: 'product'}
    ];

    const actualList = service.prepareProductList(products);

    expect(actualList).toEqual(expectedList);
  });

  it('should replace negative prices with 0', () => {
    const products = [
      new Product(' Joint ', '2021-09-14', '2;8,4', 10),
      new Product(' Joint ', '2025-09-14', '1;-45', 4)
    ];
    const expectedList = [
      {name: 'Joint', updated_at: '2025-09-14', prices: [1, 0], rate: 4, category: 'product'}
    ];

    const actualList = service.prepareProductList(products);

    expect(actualList).toEqual(expectedList);
  });

  it('should format date to ISO 8601 (YYYY-MM-DD)', () => {
    const products = [
      new Product(' Joint ', '14/09/2025', '1;-45', 4)
    ];
    const expectedList = [
      {name: 'Joint', updated_at: '2025-09-14', prices: [1, 0], rate: 4, category: 'product'}
    ];

    const actualList = service.prepareProductList(products);

    expect(actualList).toEqual(expectedList);
  });
});
