import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {PRODUCT_REPOSITORY_TOKEN} from './core/shared/product.tokens';
import {ProductApiRepository} from './core/infra/repositories/product-api.repository';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    {provide: PRODUCT_REPOSITORY_TOKEN, useClass: ProductApiRepository},
    provideHttpClient(withInterceptorsFromDi())
  ]
};
