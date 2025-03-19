import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthRequest } from '../../dtos/user/auth-request.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  authRequest:AuthRequest={
    email:'',
    password:''
  };
  userId:number=0;

  constructor(private authService:AuthService, private route:Router){}

onSubmit() {
this.authService.authenticate(this.authRequest).subscribe({
  next:(response)=>{
                
                localStorage.setItem('userId',response.userId.toString());      
                localStorage.setItem('accessToken',response.accessToken.toString());
               console.log(response.role);
                if(response.role.toLocaleString()==="ADMIN")
                {
                  this.route.navigate(['admin']);
                }
                else
                {
                  this.route.navigate(['home']);
                }
               
              
  }});
}

goToSignUp()
{
this.route.navigate(['sign-up'])
}

}
