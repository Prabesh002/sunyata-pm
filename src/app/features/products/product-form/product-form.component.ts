// src/app/features/products/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="product-form-container p-4">
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h2 class="mb-0">{{ isEditMode ? 'Edit' : 'Create' }} Product</h2>
        </div>
        
        <div class="card-body">
          <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
            <div class="row g-4">
              <!-- Left Column -->
              <div class="col-md-6">
                <div class="border rounded p-4 h-100 bg-light">
                  <h4 class="mb-4">Basic Information</h4>
                  
                  <div class="mb-3">
                    <label for="name" class="form-label fw-bold">Product Name</label>
                    <input 
                      type="text" 
                      class="form-control form-control-lg" 
                      id="name" 
                      formControlName="name"
                      [class.is-invalid]="productForm.get('name')?.invalid && productForm.get('name')?.touched"
                      placeholder="Enter product name"
                    >
                    <div class="invalid-feedback">
                      Product name is required
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="sku" class="form-label fw-bold">SKU</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="sku" 
                      formControlName="sku"
                      [class.is-invalid]="productForm.get('sku')?.invalid && productForm.get('sku')?.touched"
                      placeholder="Enter SKU"
                    >
                    <div class="invalid-feedback">
                      SKU is required
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="price" class="form-label fw-bold">Price</label>
                      <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input 
                          type="number" 
                          class="form-control" 
                          id="price" 
                          formControlName="price"
                          [class.is-invalid]="productForm.get('price')?.invalid && productForm.get('price')?.touched"
                          placeholder="0.00"
                        >
                      </div>
                      <div class="invalid-feedback">
                        Valid price is required
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label for="stockQuantity" class="form-label fw-bold">Stock</label>
                      <input 
                        type="number" 
                        class="form-control" 
                        id="stockQuantity" 
                        formControlName="stockQuantity"
                        placeholder="0"
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="col-md-6">
                <div class="border rounded p-4 h-100 bg-light">
                  <h4 class="mb-4">Additional Details</h4>

                  <div class="mb-4">
                    <label for="description" class="form-label fw-bold">Description</label>
                    <textarea 
                      class="form-control" 
                      id="description" 
                      rows="4" 
                      formControlName="description"
                      placeholder="Enter product description"
                    ></textarea>
                  </div>

                  <div class="mb-3">
                    <label for="categoryId" class="form-label fw-bold">Category</label>
                    <select class="form-select" id="categoryId" formControlName="categoryId">
                      <option value="">Select Category</option>
                      <!-- TODO: FETCH CATEGORIES FROM API -->
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="brandId" class="form-label fw-bold">Brand</label>
                    <select class="form-select" id="brandId" formControlName="brandId">
                      <option value="">Select Brand</option>
                      <!-- TODO: FETCH BRANDS FROM API -->
                      <option value="1">Brand 1</option>
                      <option value="2">Brand 2</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="manufacturerId" class="form-label fw-bold">Manufacturer</label>
                    <select class="form-select" id="manufacturerId" formControlName="manufacturerId">
                      <option value="">Select Manufacturer</option>
                      <!-- TODO: FETCH MANUFACTURERS FROM API -->
                      <option value="1">Manufacturer 1</option>
                      <option value="2">Manufacturer 2</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex justify-content-end mt-4 gap-2">
              <button type="button" class="btn btn-outline-secondary btn-lg px-4" (click)="goBack()">
                Cancel
              </button>
              <button 
                type="submit" 
                class="btn btn-primary btn-lg px-4"
                [disabled]="productForm.invalid || isSubmitting"
              >
                {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }} Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-form-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .form-label {
      color: #333;
    }
    .card-header {
      background-color: #2c3e50 !important;
    }
  `]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  isSubmitting = false;
  productId?: number;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]],
      brandId: [null, [Validators.required]],
      manufacturerId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct(this.productId);
    }

    // TODO: FETCH DROPDOWN DATA FROM APIS
    this.loadCategories();
    this.loadBrands();
    this.loadManufacturers();
  }

  loadProduct(id: number): void {
    // TODO: FETCH FROM API
    this.productsService.getProduct(id).subscribe({
      next: (product) => {
        if (product) {
          this.productForm.patchValue(product);
        } else {
          // Product not found, redirect to list
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        // Handle error (show toast/notification)
      }
    });
  }

  loadCategories(): void {
    // TODO: FETCH CATEGORIES FROM API
    console.log('Loading categories...');
  }

  loadBrands(): void {
    // TODO: FETCH BRANDS FROM API
    console.log('Loading brands...');
  }

  loadManufacturers(): void {
    // TODO: FETCH MANUFACTURERS FROM API
    console.log('Loading manufacturers...');
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      const productData = this.productForm.value;

      const request = this.isEditMode
        ? this.productsService.updateProduct(this.productId!, productData)
        : this.productsService.createProduct(productData);

      request.subscribe({
        next: () => {
          // TODO: SHOW SUCCESS NOTIFICATION
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error saving product:', error);
          // TODO: SHOW ERROR NOTIFICATION
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormAsTouched();
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  private markFormAsTouched(): void {
    Object.values(this.productForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}