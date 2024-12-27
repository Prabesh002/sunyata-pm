// src/app/features/products/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="product-detail-container p-4">
    <div class="card shadow-sm" *ngIf="product">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h2 class="mb-0">Product Details</h2>
        <button 
          class="btn btn-light"
          [routerLink]="['/products/edit', product.id]"
        >
          Edit Product
        </button>
      </div>
      
      <div class="card-body">
        <div class="row">
          <!-- Main Product Info -->
          <div class="col-md-8">
            <div class="product-info p-4 bg-light rounded">
              <h3 class="product-name mb-2">{{ product.name }}</h3>
              <span class="sku-badge badge bg-secondary">SKU: {{ product.sku }}</span>
              
              <hr class="my-4">
              
              <div class="description mb-4">
                <h5 class="text-muted mb-2">Description</h5>
                <p>{{ product.description || 'No description available' }}</p>
              </div>

              <div class="key-details">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="detail-card p-3 border rounded">
                      <label class="text-muted">Price</label>
                      <h4 class="mb-0 text-primary">{{ product.price | currency }}</h4>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="detail-card p-3 border rounded">
                      <label class="text-muted">Stock</label>
                      <h4 class="mb-0" [class.text-danger]="product.stockQuantity < 10">
                        {{ product.stockQuantity }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Metadata -->
          <div class="col-md-4">
            <div class="metadata-section p-4 bg-light rounded">
              <h5 class="text-muted mb-4">Additional Information</h5>
              
              <div class="metadata-item mb-3">
                <label class="text-muted d-block">Category</label>
                <span class="fw-bold">Category {{ product.categoryId }}</span>
              </div>
              
              <div class="metadata-item mb-3">
                <label class="text-muted d-block">Brand</label>
                <span class="fw-bold">Brand {{ product.brandId }}</span>
              </div>
              
              <div class="metadata-item mb-3">
                <label class="text-muted d-block">Manufacturer</label>
                <span class="fw-bold">Manufacturer {{ product.manufacturerId }}</span>
              </div>

              <hr class="my-4">

              <div class="timestamps text-muted small">
                <div class="mb-2">
                  <i class="bi bi-calendar"></i> Created: 
                  {{ product.createdAt | date:'medium' }}
                </div>
                <div>
                  <i class="bi bi-clock"></i> Last Updated: 
                  {{ product.updatedAt | date:'medium' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-4">
          <button type="button" class="btn btn-outline-secondary" (click)="goBack()">
            Back to Products
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="text-center p-5" *ngIf="!product">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
`,
  styles: [`
  .product-detail-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .product-name {
    color: #2c3e50;
  }
  .sku-badge {
    font-size: 0.9rem;
  }
  .detail-card {
    background: white;
  }
  .card-header {
    background-color: #2c3e50 !important;
  }
  .metadata-section {
    height: 100%;
  }
`]
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    } else {
      this.router.navigate(['/products']);
    }
  }

  loadProduct(id: number): void {
    // TODO: FETCH FROM API
    this.productsService.getProduct(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
        } else {
          // Product not found, redirect to list
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        // TODO: SHOW ERROR NOTIFICATION
        this.router.navigate(['/products']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}