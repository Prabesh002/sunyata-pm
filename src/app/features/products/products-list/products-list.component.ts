import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container-fluid">
      <div class="row mb-3">
        <div class="col">
          <h2>Products</h2>
          <button class="btn btn-primary" routerLink="create">
            Add New Product
          </button>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{ product.sku }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price | currency }}</td>
              <td>{{ product.stockQuantity }}</td>
              <td>
                <button class="btn btn-sm btn-info me-2" 
                        [routerLink]="[product.id]">
                  View
                </button>
                <button class="btn btn-sm btn-primary me-2" 
                        [routerLink]="['edit', product.id]">
                  Edit
                </button>
                <button class="btn btn-sm btn-danger" 
                        (click)="deleteProduct(product.id!)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts()
      .subscribe(products => this.products = products);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id)
        .subscribe(() => this.loadProducts());
    }
  }
}