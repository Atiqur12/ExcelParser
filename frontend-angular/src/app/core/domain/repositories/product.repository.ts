import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

export interface ProductRepository {
  sendProducts(products: Product[]): Observable<{ status: number }>;
}
