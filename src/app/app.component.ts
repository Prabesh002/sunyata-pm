import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
    template: `
        <nav class="gemini-navbar">
          <div class="gemini-navbar-container">
            <a class="gemini-brand" href="#">Sunyata PM</a>
            <ul class="gemini-nav-list">
                <li class="gemini-nav-item">
                    <a class="gemini-nav-link"
                       routerLink="/products"
                       routerLinkActive="active"
                       [routerLinkActiveOptions]="{exact: true}">Products</a>
                </li>
                <li class="gemini-nav-item">
                    <a class="gemini-nav-link"
                       routerLink="/categories"
                       routerLinkActive="active">Categories</a>
                </li>
                <li class="gemini-nav-item">
                   <a class="gemini-nav-link"
                        routerLink="/brands"
                        routerLinkActive="active">Brands</a>
                </li>
                <li class="gemini-nav-item">
                    <a class="gemini-nav-link"
                       routerLink="/manufacturers"
                       routerLinkActive="active">Manufacturers</a>
                </li>
            </ul>
          </div>
        </nav>

        <div class="container-fluid mt-5 gemini-container">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .gemini-navbar {
            background-color: #1a1a1a;
            box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
            padding: 1.25rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid #333;

        }
        .gemini-navbar-container {
           display: flex;
           align-items: center;
           max-width: 1200px;
           margin: 0 auto;
          padding: 0 2rem;
          justify-content: space-between;
        }

        .gemini-brand {
            font-size: 1.75rem;
            font-weight: 600;
            color: #fff;
            text-decoration: none; /* Remove default underline */
        }

        .gemini-nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
             display: flex;
            align-items: center;

        }

        .gemini-nav-item {
            margin: 0;
        }

        .gemini-nav-link {
            color: #999;
            font-weight: 500;
            padding: 0.6rem 1.2rem;
             border-radius: 4px;
            text-decoration: none; /* Remove default underline */
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
            margin-left: 0.5rem;
             display: block; /* So that spacing and hover work properly */

        }

        .gemini-nav-link.active,
        .gemini-nav-link:hover {
            background-color: #333;
            color: #fff;
        }

        .gemini-container {
            padding: 2.5rem;
            background-color: #121212;
            min-height: 80vh;
            color: #fff;
             margin-top: 0; /* remove the gap from the content */
        }
    `]
})
export class AppComponent {
    title = 'sunyata-pm';
}