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

    constructor(private authService: AuthService, private route: Router) {}

    onSubmit() {
        // Clear any previous errors
        this.fieldErrors = {};
        
        this.authService.authenticate(this.authRequest).subscribe({
            next: (response: AuthDetails) => {
                console.log('Login successful:', response);
                // Store user data
                localStorage.setItem('userId', response.userId.toString());
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('userRole', response.role.toLowerCase());
                
                // Navigate based on role
                if (response.role.toLowerCase() === 'admin') {
                    this.route.navigate(['/admin']);
                } else {
                    this.route.navigate(['/home']);
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
}
