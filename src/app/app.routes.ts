import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes')
      .then(m => m.PRODUCT_ROUTES)
  },
    {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes')
      .then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];