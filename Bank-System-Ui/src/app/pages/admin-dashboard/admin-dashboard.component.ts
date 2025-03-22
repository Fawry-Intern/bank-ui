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
    icon?: string;
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
        public router: Router
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
                this.updateRecentActivities();
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

    updateRecentActivities() {
        // Get last 5 registered users (based on highest IDs)
        const recentUsers = [...this.users]
            .sort((a, b) => Number(b.id) - Number(a.id))
            .slice(0, 5);

        const activities: Activity[] = [];

        // Add recent user registrations
        recentUsers.forEach(user => {
            activities.push({
                type: 'user',
                title: `New user registration: ${user.firstName} ${user.lastName}`,
                time: new Date(),
                icon: 'fa-user-plus'
            });
        });

        // Add account status changes
        const activeAccounts = this.users.filter(user => user.bankAccountStatus);
        const inactiveAccounts = this.users.filter(user => !user.bankAccountStatus);

        activities.push({
            type: 'account',
            title: `Active Bank Accounts: ${activeAccounts.length}`,
            time: new Date(),
            icon: 'fa-check-circle'
        });

        activities.push({
            type: 'account',
            title: `Inactive Bank Accounts: ${inactiveAccounts.length}`,
            time: new Date(),
            icon: 'fa-times-circle'
        });

        // Add system activity
        activities.push({
            type: 'system',
            title: 'System Status: Online',
            time: new Date(),
            icon: 'fa-server'
        });

        this.recentActivities = activities;
    }

    loadRecentActivities() {
        if (this.users.length > 0) {
            this.updateRecentActivities();
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

    // Quick Action Methods
    viewAllUsers() {
        // Scroll to the Users Management section
        const usersSection = document.querySelector('.users-table-section');
        if (usersSection) {
            usersSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    viewActiveAccounts() {
        this.router.navigate(['/active-account']);
    }

    viewBlockedAccounts() {
        this.router.navigate(['/un-active-account']);
    }
}
