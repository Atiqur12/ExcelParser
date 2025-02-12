import {Injectable} from '@angular/core';
import {ProductRepository} from '../../domain/repositories/product.repository';
import {Product} from '../../domain/models/product.model';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductApiRepository implements ProductRepository {
  public static readonly API_URL = 'http://localhost:3000/api/kraken';

  constructor(private http: HttpClient) {
  }

  sendProducts(products: Product[]): Observable<{ status: number }> {
    try {
      return this.http.post<{ status: number }>(ProductApiRepository.API_URL, products)
        .pipe(
          catchError((error) => {
            console.error('Error caught:', error); // Log detailed error
            return throwError(() => new Error(`Failed to send products : ${error}`));
          })
        );
    } catch (err) {
      console.error('Error while making HTTP request:', err);
      return throwError(() => new Error('Unexpected error while sending products.'));
    }
  }


}
