import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { BaseApiService } from '../../core/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseApiService {
  private endpoint = 'products';

  getProducts(): Observable<Product[]> {
    return this.get<Product[]>(this.endpoint);
  }

  getProduct(id: number): Observable<Product> {
    return this.getById<Product>(this.endpoint, id);
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    return this.post<Product>(this.endpoint, product);
  }

  updateProduct(id: number, product: Omit<Product, 'createdAt' | 'updatedAt'>): Observable<Product> {
    return this.put<Product>(this.endpoint, id, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.delete(this.endpoint, id);
  }
}
