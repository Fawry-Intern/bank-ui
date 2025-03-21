import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/admin-sidebar/sidebar.component";
import { UserTableComponent } from "../../components/user-table/user-table.component";
import { UserDetails } from '../../models/user/user-details.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-active-accounts',
  imports: [SidebarComponent, UserTableComponent],
  templateUrl: './active-accounts.component.html',
  styleUrl: './active-accounts.component.css'
})
export class ActiveAccountsComponent {

   users:UserDetails[]=[];
  
      constructor(private userService:UserService)
      {
  
      }
  
      ngOnInit(){
          this.getAllUsersWithActiveAccounts();
      }
        
      getAllUsersWithActiveAccounts(){
          this.userService.getAllUsersWithActiveAccounts().subscribe({
              next: (response) => {
                this.users=response;
                console.log(response);
              }})
          }
}
