import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDetails } from '../../models/user/user-details.model';
import { filter } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
@Component({
  selector: 'app-user-table',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {


  @Input() users:UserDetails[]=[];
  filteredUsers:UserDetails[]=[];
  searchQuery = '';
 
  constructor(private userService:UserService,private accountService:AccountService)
  {

  }
 ngOnChanges(changes: SimpleChanges): void {
  
  if (changes['users']) {
 
    this.filterUsers();
  }
}
  // Filter users based on search query
  filterUsers() {
    if (this.searchQuery === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  toggleUserStatus(user: any) {

    if(user.isActive===true)
    {
      this.userService.deactivateUser(user.id).subscribe((response)=>{
       console.log(response);
      });
    }
    else  this.userService.activateUser(user.id).subscribe((response)=>{
      console.log(response);
     });

    
    user.isActive=!user.isActive;
 

  }
  toggleBankAccountStatus(user:any)
  {

    if(user.bankAccountStatus===true)
      {
       this.accountService.deactivateAccount(user.bankAccountId).subscribe((response)=>{
         console.log(response);
       })
      }
      else this.accountService.activateAccount(user.bankAccountId).subscribe((response)=>{
       console.log(response);
      });
 
    user.bankAccountStatus=!user.bankAccountStatus;
  }


  getUserId(){
    return localStorage.getItem('userId');
  }
  
}
