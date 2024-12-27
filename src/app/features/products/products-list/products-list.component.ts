import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../models/product.model';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './products-list.component.html'
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