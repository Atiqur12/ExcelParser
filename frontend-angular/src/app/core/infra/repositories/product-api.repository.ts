import {Injectable} from '@angular/core';
import {ProductRepository} from '../../domain/repositories/product.repository';
import {Product} from '../../domain/models/product.model';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductApiRepository implements ProductRepository {
  public static readonly API_URL = 'https://localhost:3000/api/kraken';

  constructor(private http: HttpClient) {
  }

  sendProducts(products: Product[]): Observable<{ status: number }> {
    return this.http.post<{ status: number }>(ProductApiRepository.API_URL, products)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(`Failed to send products : ${error}`));
        })
      );
  }

}
