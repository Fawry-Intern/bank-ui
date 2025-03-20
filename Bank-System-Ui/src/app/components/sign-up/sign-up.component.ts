import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../dtos/user/register-request.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    standalone:true,
    imports: [CommonModule,FormsModule],
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  registerRequest: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: ''
  };
  fieldErrors: { [key: string]: string } = {};  

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        console.log(response);
        console.log('hello from sign up');
        this.router.navigate(['login']);
      },
      error: (err) => {
       
        
        if (err.error?.fieldErrors) {
          this.fieldErrors = err.error.fieldErrors;  
        }

      }
    });
  }

  goToLogIn() {
    this.router.navigate(['login']);
  }
}
