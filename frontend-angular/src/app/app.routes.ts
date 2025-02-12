import {Routes} from '@angular/router';
import {ProductFormComponent} from './features/product-form/product-form.component';

export const routes: Routes = [
  {path: '', redirectTo: 'product-form', pathMatch: 'full'},
  {path: 'product-form', component: ProductFormComponent}
];
