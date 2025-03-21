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
    standalone:true,
    imports:[FormsModule,CommonModule],
    styleUrl: './log-in.component.css'
})
export class LogInComponent {

  authRequest:AuthRequest={
    email:'',
    password:''
  };
  userId:number=0;
  fieldErrors: { [key: string]: string } = {};  
  constructor(private authService:AuthService, private route:Router){}

onSubmit() {
this.authService.authenticate(this.authRequest).subscribe({
  next:(response:AuthDetails)=>{
                
                localStorage.setItem('userId',response.userId.toString());      
                localStorage.setItem('accessToken',response.accessToken);
               console.log(response.role);
                if(response.role.toLocaleString()==="ADMIN")
                {
                  this.route.navigate(['admin']);
                }
                else
                {
                  this.route.navigate(['home']);
                }
               
              
  }, error: (err) =>{

    console.error('Error at login process:', err)
   
      this.fieldErrors['password']="Invalid email or password";
    
  } 
    
});
}

goToSignUp()
{
this.route.navigate(['sign-up'])
}

}
