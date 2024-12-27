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
      <div class="card gemini-card shadow-sm" *ngIf="product">
        <div class="card-header gemini-card-header d-flex justify-content-between align-items-center">
          <h2 class="mb-0 text-white">Product Details</h2>
          <button
            class="btn btn-light gemini-rounded-btn"
            [routerLink]="['/products/edit', product.id]"
          >
            Edit Product
          </button>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <div class="product-info p-4 gemini-bg rounded">
                <h3 class="product-name mb-2 text-white">{{ product.name }}</h3>
                <span class="sku-badge badge">SKU: {{ product.sku }}</span>
                <hr class="my-4 gemini-hr">
                <div class="description mb-4">
                  <h5 class="text-muted mb-2">Description</h5>
                  <p class="text-white gemini-text-spacing">{{ product.description || 'No description available' }}</p>
                </div>
                <div class="key-details">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="detail-card p-3 border rounded gemini-detail-card">
                        <label class="text-muted">Price</label>
                        <h4 class="mb-0 text-primary gemini-text-spacing">{{ product.price | currency }}</h4>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="detail-card p-3 border rounded gemini-detail-card">
                        <label class="text-muted">Stock</label>
                        <h4 class="mb-0 gemini-text-spacing" [class.text-danger]="product.stockQuantity < 10">
                          {{ product.stockQuantity }}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="metadata-section p-4 gemini-bg rounded">
                <h5 class="text-muted mb-4">Additional Information</h5>
                <div class="metadata-item mb-3">
                  <label class="text-muted d-block">Category</label>
                  <span class="fw-bold text-white gemini-text-spacing">Category {{ product.categoryId }}</span>
                </div>
                <div class="metadata-item mb-3">
                  <label class="text-muted d-block">Brand</label>
                  <span class="fw-bold text-white gemini-text-spacing">Brand {{ product.brandId }}</span>
                </div>
                <div class="metadata-item mb-3">
                  <label class="text-muted d-block">Manufacturer</label>
                  <span class="fw-bold text-white gemini-text-spacing">Manufacturer {{ product.manufacturerId }}</span>
                </div>
                <hr class="my-4 gemini-hr">
                <div class="timestamps text-muted small">
                  <div class="mb-2 gemini-text-spacing">
                    <i class="bi bi-calendar"></i> Created:
                    {{ product.createdAt | date: 'medium' }}
                  </div>
                  <div class="gemini-text-spacing">
                    <i class="bi bi-clock"></i> Last Updated:
                    {{ product.updatedAt | date: 'medium' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <button type="button" class="btn btn-outline-secondary gemini-rounded-btn" (click)="goBack()">
              Back to Products
            </button>
          </div>
        </div>
      </div>
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
        margin: 20px auto;
        font-family: 'Roboto', sans-serif;
    }
    .gemini-card {
        background-color: #202124;
        border-radius: 12px;
        color: #e8eaed;
        border: none;
    }
    .gemini-card-header {
        background-color: #333538 !important;
        border-bottom: 1px solid #3c4043;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        padding: 15px 20px;
    }
    .gemini-bg {
        background-color: #303134;
        border-radius: 12px;
    }
    .gemini-detail-card {
        background-color: #3a3b3e;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .gemini-hr {
        border-color: #44474a;
    }
    .product-name {
        color: #e8eaed;
    }
    .sku-badge {
        font-size: 0.9rem;
        color: #e8eaed;
        background-color: #5f6368;
        padding: 0.3em 0.6em;
        border-radius: 4px;
    }
    .detail-card {
        color: #e8eaed;
    }
    .metadata-section {
        height: 100%;
    }
    .text-muted {
       color: #9aa0a6 !important;
    }
    label.text-muted {
        font-size: 0.9rem;
        display: block;
    }
    .card-body {
      padding: 20px;
    }
    .gemini-rounded-btn {
        border-radius: 20px;
        padding: 8px 16px;
        transition: background-color 0.2s ease;
        border: none;
    }
    .gemini-rounded-btn:hover {
        background-color: #5f6368;
        color: #fff;
    }
    .btn-light {
        color: #e8eaed;
        background-color: #5f6368;
    }
    .btn-light:hover {
        background-color: #55575b;
    }
    .gemini-text-spacing {
      line-height: 1.6;
      margin-bottom: 0.5rem;
      display: block;
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
    this.productsService.getProduct(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
        } else {
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.router.navigate(['/products']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}