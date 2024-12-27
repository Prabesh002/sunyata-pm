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
        <div class="product-form-container gemini-theme p-4">
            <div class="card gemini-card rounded-4 shadow-sm">
                <div class="card-header gemini-card-header rounded-top-4">
                    <h2 class="mb-0 text-white">{{ isEditMode ? 'Edit' : 'Create' }} Product</h2>
                </div>

                <div class="card-body">
                    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
                        <div class="row g-4">
                            <!-- Left Column -->
                            <div class="col-md-6">
                                <div class="rounded-4 p-4 h-100 gemini-form-section">
                                    <h4 class="mb-4 text-white gemini-text-spacing">Basic Information</h4>

                                    <div class="mb-3">
                                        <label for="name" class="form-label text-white fw-bold gemini-text-spacing">Product Name</label>
                                        <input
                                            type="text"
                                            class="form-control gemini-input rounded-3 form-control-lg"
                                            id="name"
                                            formControlName="name"
                                            [class.is-invalid]="productForm.get('name')?.invalid && productForm.get('name')?.touched"
                                            placeholder="Enter product name"
                                        >
                                        <div class="invalid-feedback gemini-invalid-text">
                                            Product name is required
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="sku" class="form-label text-white fw-bold gemini-text-spacing">SKU</label>
                                        <input
                                            type="text"
                                            class="form-control gemini-input rounded-3"
                                            id="sku"
                                            formControlName="sku"
                                            [class.is-invalid]="productForm.get('sku')?.invalid && productForm.get('sku')?.touched"
                                            placeholder="Enter SKU"
                                        >
                                        <div class="invalid-feedback gemini-invalid-text">
                                            SKU is required
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="price" class="form-label text-white fw-bold gemini-text-spacing">Price</label>
                                            <div class="input-group">
                                                <span class="input-group-text gemini-input-group-text rounded-start-3">$</span>
                                                <input
                                                    type="number"
                                                    class="form-control gemini-input rounded-end-3"
                                                    id="price"
                                                    formControlName="price"
                                                    [class.is-invalid]="productForm.get('price')?.invalid && productForm.get('price')?.touched"
                                                    placeholder="0.00"
                                                >
                                            </div>
                                            <div class="invalid-feedback gemini-invalid-text">
                                                Valid price is required
                                            </div>
                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <label for="stockQuantity" class="form-label text-white fw-bold gemini-text-spacing">Stock</label>
                                            <input
                                                type="number"
                                                class="form-control gemini-input rounded-3"
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
                                <div class="rounded-4 p-4 h-100 gemini-form-section">
                                    <h4 class="mb-4 text-white gemini-text-spacing">Additional Details</h4>

                                    <div class="mb-4">
                                        <label for="description" class="form-label text-white fw-bold gemini-text-spacing">Description</label>
                                        <textarea
                                            class="form-control gemini-input rounded-3"
                                            id="description"
                                            rows="4"
                                            formControlName="description"
                                            placeholder="Enter product description"
                                        ></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="categoryId" class="form-label text-white fw-bold gemini-text-spacing">Category</label>
                                        <select class="form-select gemini-input rounded-3" id="categoryId" formControlName="categoryId">
                                            <option value="">Select Category</option>
                                            <!-- TODO: FETCH CATEGORIES FROM API -->
                                            <option value="1">Category 1</option>
                                            <option value="2">Category 2</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="brandId" class="form-label text-white fw-bold gemini-text-spacing">Brand</label>
                                        <select class="form-select gemini-input rounded-3" id="brandId" formControlName="brandId">
                                            <option value="">Select Brand</option>
                                            <!-- TODO: FETCH BRANDS FROM API -->
                                            <option value="1">Brand 1</option>
                                            <option value="2">Brand 2</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="manufacturerId" class="form-label text-white fw-bold gemini-text-spacing">Manufacturer</label>
                                        <select class="form-select gemini-input rounded-3" id="manufacturerId" formControlName="manufacturerId">
                                            <option value="">Select Manufacturer</option>
                                            <!-- TODO: FETCH MANUFACTURERS FROM API -->
                                            <option value="1">Manufacturer 1</option>
                                            <option value="2">Manufacturer 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div class="d-flex justify-content-end mt-4 gap-2">
                           <button type="button" class="btn btn-outline-secondary gemini-rounded-btn btn-lg px-4" (click)="goBack()">
                              Cancel
                            </button>
                            <button
                              type="submit"
                              class="btn btn-primary gemini-rounded-btn btn-lg px-4"
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
        .gemini-theme {
            background-color: #1a1a1a;
            color: #fff;
            padding: 2rem;
            font-family: 'Roboto', sans-serif;
        }

        .product-form-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .gemini-card {
            background-color: #202124;
            border: none;
             border-radius: 12px;
         }

        .gemini-card-header {
            background-color: #333538 !important;
             border-bottom: 1px solid #3c4043;
            padding: 1.2rem;
             border-top-left-radius: 12px;
            border-top-right-radius: 12px;
         }

        .gemini-form-section {
             background-color: #303134;
             border-radius: 12px;
        }

        .gemini-input {
            background-color: #3a3b3e;
            color: #fff;
            border: 1px solid #444;
        }

        .gemini-input:focus {
            border-color: #555;
            box-shadow: none;
        }
        .gemini-input-group-text {
            background-color: #3a3b3e;
            color: #fff;
            border: 1px solid #444;
        }
         .form-label{
            margin-bottom: 0.4rem;
         }

        .btn {
            font-size: 0.875rem;
        }
         .gemini-rounded-btn{
            border-radius: 20px;
             padding: 8px 16px;
             transition: background-color 0.2s ease;
             border: none;
        }
        .btn-outline-secondary{
          color: #e8eaed;
          background-color: #5f6368;
         }
        .btn-outline-secondary:hover {
             background-color: #55575b;
            color: #fff;
         }
        .btn-primary{
          background-color: #1a73e8;
          border-color: #1a73e8;
        }
       .btn-primary:hover{
            background-color: #155bb5;
             border-color: #155bb5;
        }
       .gemini-invalid-text {
          color: #ff7f7f;
          font-size: 0.9rem;
          margin-top: 0.2rem;
         }
       .gemini-text-spacing {
            line-height: 1.6;
            margin-bottom: 0.5rem;
             display: block;
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
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.productId = +id;
            this.loadProduct(this.productId);
        }

        this.loadCategories();
        this.loadBrands();
        this.loadManufacturers();
    }

    loadProduct(id: number): void {
        this.productsService.getProduct(id).subscribe({
            next: (product) => {
                if (product) {
                    this.productForm.patchValue(product);
                } else {
                    this.router.navigate(['/products']);
                }
            },
            error: (error) => {
                console.error('Error loading product:', error);
            }
        });
    }

    loadCategories(): void {
        console.log('Loading categories...');
    }

    loadBrands(): void {
        console.log('Loading brands...');
    }

    loadManufacturers(): void {
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
                    this.router.navigate(['/products']);
                },
                error: (error) => {
                    console.error('Error saving product:', error);
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