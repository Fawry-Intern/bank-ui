import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user/user-details.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/admin-sidebar/sidebar.component';
@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule,SidebarComponent ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userId:Number=0;
  user:UserDetails | undefined;
  
  constructor(private route:ActivatedRoute,private userService:UserService)
  {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = +paramMap.get('id')!;
      console.log(this.userId);
      this.fetchProfileData();
    });
  }

 
  fetchProfileData()
  {
      this.userService.getUserProfile(this.userId).subscribe((response)=>{

        this.user=response;
      })
  }

isUser():Boolean
{
  
return localStorage.getItem('role')!=='ADMIN'
}

}
