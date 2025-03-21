
import { Component, Input } from "@angular/core";

import { UserTableComponent } from "../../components/user-table/user-table.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserDetails } from "../../models/user/user-details.model";
import { UserService } from "../../services/user.service";
import { SidebarComponent } from "../../components/admin-sidebar/sidebar.component";
import { AccountService } from "../../services/account.service";

@Component({
    selector: 'app-admin-dashboard',
   standalone:true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [SidebarComponent,UserTableComponent,CommonModule,FormsModule]
})
export class AdminDashboardComponent {

    users:UserDetails[]=[];

    constructor(private userService:UserService,private accountService:AccountService)
    {

    }

    ngOnInit(){
        this.getAllUsers();
    }
      
    getAllUsers(){
        this.userService.getAllUsers().subscribe({
            next: (response) => {
              this.users=response;
              console.log(response);
            }})
        }



}
