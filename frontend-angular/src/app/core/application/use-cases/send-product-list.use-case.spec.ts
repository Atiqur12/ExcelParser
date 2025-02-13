import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {SendProductListUseCase} from './send-product-list.use-case';
import {PRODUCT_REPOSITORY_TOKEN} from '../../shared/product.tokens';
import {ProductRepository} from '../../domain/repositories/product.repository';
import {Product} from '../../domain/models/product.model';

describe('SendProductListUseCase', () => {
  let useCase: SendProductListUseCase;
  let productRepoMock: Partial<ProductRepository>;

  beforeEach(() => {
    productRepoMock = {
      sendProducts: jest.fn().mockReturnValue(of({status: 200}))
    };

    TestBed.configureTestingModule({
      providers: [
        SendProductListUseCase,
        {provide: PRODUCT_REPOSITORY_TOKEN, useValue: productRepoMock}
      ]
    });

    useCase = TestBed.inject(SendProductListUseCase);
  });

  it('should save a valid product', (done) => {
    const products: Product[] = [
      new Product('Test Product', '2023-10-10', '10;20,5', 5)
    ];

    useCase.executeSend(products).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but received an error.');
        done();
      }
    });
  });

  it('should throw an error when sending product fails', (done) => {
    (productRepoMock.sendProducts as jest.Mock).mockReturnValue(
      throwError(() => new Error('Failed to send products : Test error'))
    );

    const products: Product[] = [
      new Product('Test Product', '2023-10-10', '10;20,5', 5)
    ];

    useCase.executeSend(products).subscribe({
      next: () => {
        fail('Expected error, but call succeeded.');
        done();
      },
      error: (err) => {
        expect(err.message).toContain('Failed to send products');
        done();
      }
    });
  });
});
