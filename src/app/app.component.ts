import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Sunyata PM</a>
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" 
                 routerLink="/products" 
                 routerLinkActive="active">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 routerLink="/categories" 
                 routerLinkActive="active">Categories</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 routerLink="/brands" 
                 routerLinkActive="active">Brands</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" 
                 routerLink="/manufacturers" 
                 routerLinkActive="active">Manufacturers</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .navbar-nav .nav-link.active {
      color: white;
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  title = 'sunyata-pm';
}