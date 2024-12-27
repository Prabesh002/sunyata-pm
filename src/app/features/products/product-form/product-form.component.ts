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
    templateUrl: './product-form.component.html',
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