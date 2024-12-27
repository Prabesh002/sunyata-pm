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
        <div class="container-fluid dark-theme">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="text-white">Products</h2>
                <button class="btn btn-outline-primary add-product-btn" routerLink="create">
                    Add New Product
                </button>
            </div>

            <div class="table-responsive">
                <table class="table dark-table table-hover">
                    <thead class="dark-thead">
                        <tr>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th class="actions-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let product of products" class="dark-table-row">
                            <td>{{ product.sku }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price | currency }}</td>
                            <td>{{ product.stockQuantity }}</td>
                            <td class="actions-cell">
                                <div class="action-buttons"> <!-- Wrapper for buttons-->
                                    <button class="btn btn-sm btn-secondary me-1 action-button"
                                            [routerLink]="[product.id]">
                                        View
                                    </button>
                                    <button class="btn btn-sm btn-primary me-1 action-button"
                                            [routerLink]="['edit', product.id]">
                                        Edit
                                    </button>
                                    <button class="btn btn-sm btn-danger action-button"
                                            (click)="deleteProduct(product.id!)">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                         <tr *ngIf="products.length === 0">
                             <td colspan="5" class="text-center text-muted">No products available</td>
                         </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: [`
        .dark-theme {
            background-color: #1a1a1a;
             color: #fff;
             padding: 2rem;
         }

         h2 {
              margin: 0;
         }

         .add-product-btn {
            border-color: #696969 !important;
            color: #696969 !important;
          }

        .dark-table {
            width: 100%;
            border-collapse: collapse;
        }

        .dark-thead th {
            background-color: #333;
            color: #fff;
            padding: 1.2rem;
            text-align: left;
            border-bottom: 1px solid #444;
        }

       .dark-table-row td {
            padding: 1.2rem;
            border-bottom: 1px solid #222;
        }

       .dark-table-row:nth-child(even) {
          background-color: #222;
        }

        .table-hover tbody tr:hover {
             background-color: #333;
         }

          .actions-header {
             width: 20%; /* Give actions column a specific width */
         }
         .actions-cell{
            text-align:center;
          }

         .action-buttons{
            display: inline-flex;
            gap: 0.5rem;
        }

         .action-button{
             padding: 0.6rem 0.9rem; /* Added padding to each button*/
         }

        .btn {
            font-size: 0.875rem;
             border-radius: 4px;
         }
        .btn-secondary{
          background-color: #444;
          color: #fff;
          border-color: #555;
        }

        .btn-secondary:hover{
          background-color: #555;
        }
        .btn-primary:hover{
          background-color: #0056b3;
          border-color: #004085;
        }
    `]
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];

    constructor(private productsService: ProductsService) { }

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