import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    imports:[FormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    username = '';
    password = '';
    errorMessage = '';
    constructor(private authService: AuthService, private router: Router) { }
    register(): void {
       this.authService.register(this.username, this.password)
           .subscribe({
             next: ()=> {
                 this.router.navigate(['/auth/login'])
             },
             error: (err)=>{
                 this.errorMessage = "Username already exists"
             }
           })
    }
}