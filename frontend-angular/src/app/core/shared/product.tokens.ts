import {InjectionToken} from '@angular/core';
import {ProductRepository} from '../domain/repositories/product.repository';

export const PRODUCT_REPOSITORY_TOKEN =
  new InjectionToken<ProductRepository>('ProductRepository');
