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
    productForm!: FormGroup;
    isEditMode = false;
    isSubmitting = false;
    productId?: number;
    categories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
        { id: 3, name: 'Books' },
        { id: 4, name: 'Home' },
        { id: 5, name: 'Sports' }
    ];
    brands = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Nike' },
        { id: 4, name: 'Adidas' },
        { id: 5, name: 'Sony' }
    ];
    manufacturers = [
        { id: 1, name: 'Manufacturer 1' },
        { id: 2, name: 'Manufacturer 2' },
        { id: 3, name: 'Manufacturer 3' },
        { id: 4, name: 'Manufacturer 4' },
        { id: 5, name: 'Manufacturer 5' }
    ];

    constructor(
        private fb: FormBuilder,
        private productsService: ProductsService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.productForm = this.fb.group({
            id: [null],  // Add this line
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
    }

    loadProduct(id: number): void {
        this.productsService.getProduct(id).subscribe({
            next: (product) => {
                if (product) {
                    // Include the ID in the form values
                    this.productForm.patchValue({
                        ...product,
                        id: product.id  // Make sure the ID is included
                    });
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

    onSubmit(): void {
        if (this.productForm.valid) {
            this.isSubmitting = true;
            const productData = this.productForm.value;

            const request = this.isEditMode
                ? this.productsService.updateProduct(this.productId!, {
                    ...productData,
                    id: this.productId  // Ensure ID is included for updates
                  })
                : this.productsService.createProduct(productData);

            request.subscribe({
                next: () => {
                    this.router.navigate(['/products']);
                },
                error: (error) => {
                    console.error('Error saving product:', error);
                    this.isSubmitting = false;
                },
                complete: () => {
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