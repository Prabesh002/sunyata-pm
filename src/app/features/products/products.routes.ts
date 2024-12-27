import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'create',
    component: ProductFormComponent
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent
  },
  {
    path: ':id',
    component: ProductDetailComponent
  }
];