import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Sample Product',
      description: 'Sample Description',
      price: 99.99,
      categoryId: 1,
      brandId: 1,
      manufacturerId: 1,
      sku: 'SKU001',
      stockQuantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts);
  }

  getProduct(id: number): Observable<Product | undefined> {
    return of(this.mockProducts.find(p => p.id === id));
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct = {
      ...product,
      id: this.mockProducts.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockProducts.push(newProduct);
    return of(newProduct);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts[index] = {
        ...product,
        updatedAt: new Date()
      };
      return of(this.mockProducts[index]);
    }
    throw new Error('Product not found');
  }

  deleteProduct(id: number): Observable<void> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts.splice(index, 1);
    }
    return of(void 0);
  }
}