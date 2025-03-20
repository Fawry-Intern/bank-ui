
import { Component } from "@angular/core";
import { LogInComponent } from "../log-in/log-in.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { UserTableComponent } from "../user-table/user-table.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserDetails } from "../../models/user/user-details.model";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-admin-dashboard',
   standalone:true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [SidebarComponent,UserTableComponent,CommonModule,FormsModule]
})
export class AdminDashboardComponent {

    users:UserDetails[]=[];

    constructor(private userService:UserService)
    {

    }

    ngOnInit(){
        this.getAllUsers();
    }
      
    getAllUsers(){
        this.userService.getAllUsers().subscribe({
            next: (response) => {
              this.users=response;
            }})
        }

}
