import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Get token from URL query parameters
    this.route.queryParams.subscribe(params => {
      // Try to get token from params
      let token = params['token'];
      
      // If no token found, try to get it from the full URL
      if (!token) {
        const url = window.location.href;
        
        // Handle Google redirect URL with encoded port number
        if (url.includes('google.com/url?q=')) {
          try {
            // Extract the encoded URL part
            const encodedPart = url.split('google.com/url?q=')[1].split('&')[0];
            // Replace the encoded port number with 4200
            const fixedUrl = encodedPart.replace(/%D9%A4%D9%A2%D9%A0%D9%A0/, '4200');
            // Decode the URL and extract token
            const decodedUrl = decodeURIComponent(fixedUrl);
            if (decodedUrl.includes('token=')) {
              token = decodedUrl.split('token=')[1].split('&')[0];
            }
          } catch (error) {
            console.error('Error extracting token:', error);
          }
        }
      }

      this.token = token;
      if (!this.token) {
        this.errorMessage = 'Invalid or missing reset token';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        // For debugging
        console.log('Token extracted:', this.token);
        // Manually navigate to the correct URL
        const correctUrl = `/reset-password?token=${this.token}`;
        if (window.location.pathname + window.location.search !== correctUrl) {
          this.router.navigateByUrl(correctUrl, { replaceUrl: true });
        }
      }
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const newPassword = this.resetForm.get('newPassword')?.value;

      this.authService.resetPassword(this.token, newPassword)
        .subscribe({
          next: (response) => {
            this.successMessage = response.message;
            this.isLoading = false;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          },
          error: (error) => {
            console.error('Password reset failed:', error);
            this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
            this.isLoading = false;
          }
        });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
} 