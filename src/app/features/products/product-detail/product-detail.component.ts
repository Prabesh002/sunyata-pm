import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../models/product.model';
import { Category } from '../../../shared/enums/category.enum';
import { Brand } from '../../../shared/enums/brand.enum';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
    categoryName: string | null = null;
    brandName: string | null = null;


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
            console.log(product);
            this.product = product;
              this.categoryName = product.categoryId !== null ? Category[product.categoryId] : 'N/A';
                this.brandName = product.brandId !== null ? Brand[product.brandId] : 'N/A';
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