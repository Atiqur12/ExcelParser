import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {ProductFormComponent} from './features/product-form/product-form.component';
import {routes} from './app.routes';
import {PRODUCT_REPOSITORY_TOKEN} from './core/shared/product.tokens';
import {ProductApiRepository} from './core/infra/repositories/product-api.repository';
import {SendProductListUseCase} from './core/application/use-cases/send-product-list.use-case';
import {HttpClientModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    ProductFormComponent,
    HttpClientModule
  ],
  providers: [
    {provide: PRODUCT_REPOSITORY_TOKEN, useClass: ProductApiRepository},
    [SendProductListUseCase],
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: []
})
export class AppModule {
}
