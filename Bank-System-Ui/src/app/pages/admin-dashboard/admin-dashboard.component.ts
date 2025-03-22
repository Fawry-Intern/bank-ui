import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetails } from '../../models/user/user-details.model';
import { UserService } from '../../services/user.service';
import { SidebarComponent } from '../../components/admin-sidebar/sidebar.component';
import { AccountService } from '../../services/account.service';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    imports: [CommonModule, FormsModule, SidebarComponent, UserTableComponent, DatePipe]
})
export class AdminDashboardComponent implements OnInit {
    users: UserDetails[] = [];
    loading = false;
    error: string | null = null;

    constructor(private userService: UserService, private accountService: AccountService) {}

    ngOnInit(): void {
        this.getAllUsers();
    }

    getAllUsers() {
        this.loading = true;
        this.error = null;
        this.userService.getAllUsers().subscribe({
            next: (response) => {
                this.users = response;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading users:', error);
                this.error = 'Failed to load users. Please try again.';
                this.loading = false;
            }
        });
    }

    getActiveUsersCount(): number {
        return this.users.filter(user => user.isActive).length;
    }
}
