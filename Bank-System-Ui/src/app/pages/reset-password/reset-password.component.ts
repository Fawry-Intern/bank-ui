import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PasswordResetRequest } from '../../dtos/user/password-reset-request.model';

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
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
      if (!this.token) {
        this.errorMessage = 'Invalid or missing reset token';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        console.log('Token extracted:', this.token);
      }
    });
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const resetRequest: PasswordResetRequest = {
        token: this.token,
        newPassword: this.resetForm.get('newPassword')?.value
      };
      console.log(resetRequest);

      this.authService.resetPassword(resetRequest)
        .subscribe({
          next: (response: String) => {
            this.successMessage = "Password Updated Successfully!";
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
    this.router.navigate(['login']);
  }
}
