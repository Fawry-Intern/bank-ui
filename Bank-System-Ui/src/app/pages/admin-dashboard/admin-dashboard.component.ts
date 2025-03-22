import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetails } from '../../models/user/user-details.model';
import { UserService } from '../../services/user.service';
import { SidebarComponent } from '../../components/admin-sidebar/sidebar.component';
import { AccountService } from '../../services/account.service';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

interface Activity {
    type: 'user' | 'account' | 'system';
    title: string;
    time: Date;
}

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    imports: [CommonModule, FormsModule, SidebarComponent, UserTableComponent, DatePipe]
})
export class AdminDashboardComponent implements OnInit {
    users: UserDetails[] = [];
    filteredUsers: UserDetails[] = [];
    recentActivities: Activity[] = [];
    loading = false;
    error: string | null = null;
    searchQuery: string = '';

    constructor(
        private userService: UserService,
        private accountService: AccountService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getAllUsers();
        this.loadRecentActivities();
    }

    getAllUsers() {
        this.loading = true;
        this.error = null;
        this.userService.getAllUsers().subscribe({
            next: (response) => {
                this.users = response;
                this.filteredUsers = response;
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

    loadRecentActivities() {
        // Simulate recent activities (in a real app, this would come from a backend)
        this.recentActivities = [
            {
                type: 'user',
                title: 'New user registration: John Doe',
                time: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
            },
            {
                type: 'account',
                title: 'Account activated: Jane Smith',
                time: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
            },
            {
                type: 'system',
                title: 'System maintenance completed',
                time: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
            }
        ];
    }

    getActivityIcon(type: string): string {
        switch (type) {
            case 'user':
                return 'fa-user-plus';
            case 'account':
                return 'fa-university';
            case 'system':
                return 'fa-cog';
            default:
                return 'fa-info-circle';
        }
    }

    filterUsers() {
        if (!this.searchQuery.trim()) {
            this.filteredUsers = this.users;
            return;
        }

        const query = this.searchQuery.toLowerCase();
        this.filteredUsers = this.users.filter(user => 
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    }

    viewAllUsers() {
        this.searchQuery = '';
        this.filteredUsers = this.users;
    }

    viewActiveAccounts() {
        this.router.navigate(['/active-account']);
    }

    viewBlockedAccounts() {
        this.router.navigate(['/un-active-account']);
    }
}
