import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/admin-sidebar/sidebar.component";
import { UserTableComponent } from "../../components/user-table/user-table.component";
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user/user-details.model';

@Component({
  selector: 'app-blocked-accounts',
  imports: [SidebarComponent, UserTableComponent],
  templateUrl: './blocked-accounts.component.html',
  styleUrl: './blocked-accounts.component.css'
})
export class BlockedAccountsComponent {
   users:UserDetails[]=[];
    
        constructor(private userService:UserService)
        {
    
        }
    
        ngOnInit(){
            this.getAllUsersWithBlockedAccounts();
        }
          
        getAllUsersWithBlockedAccounts(){
            this.userService.getAllUsersWithBlockedAccounts().subscribe({
                next: (response) => {
                  this.users=response;
                  console.log(response);
                }})
            }

}
