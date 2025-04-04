import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthRequest } from '../../dtos/user/auth-request.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthDetails } from '../../models/user/auth-details.model';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    standalone: true,
    imports: [FormsModule, CommonModule],
    styleUrl: './log-in.component.css'
})
export class LogInComponent {
    authRequest: AuthRequest = {
        email: '',
        password: ''
    };
    userId: number = 0;
    fieldErrors: { [key: string]: string } = {};

    constructor(private authService: AuthService, private route: Router) {localStorage.clear();}

    onSubmit() {
       
        this.fieldErrors = {};
        
        this.authService.authenticate(this.authRequest).subscribe({
            next: (response: AuthDetails) => {
                console.log('Login successful:', response);
       
                localStorage.setItem('userId', response.userId.toString());
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('userRole', response.role.toLowerCase());

                if (response.role.toLowerCase() === 'admin') {
                    this.route.navigate(['/admin-dashboard']);
                } else {
                    this.route.navigate(['/user-dashboard']);
                }
            },
            error: (err) => {
                console.error('Login failed:', err);
                this.fieldErrors['password'] = "Invalid email or password. Please try again.";
            }
        });
    }

    goToSignUp() {
        this.route.navigate(['sign-up']);
    }

    goToForgotPassword() {
        this.route.navigate(['forgot-password']);
    }
}
