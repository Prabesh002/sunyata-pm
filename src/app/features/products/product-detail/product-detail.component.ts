import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html'
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