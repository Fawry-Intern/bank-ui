import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user/user-details.model';
import { Account } from '../../models/account.model';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../components/user-sidebar/user-sidebar.component';
import { of } from 'rxjs';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css'],
    standalone: true,
    imports: [CommonModule, DatePipe, FormsModule, UserSidebarComponent]
})
export class UserDashboardComponent implements OnInit {
    user: UserDetails | null = null;
    account: Account | null = null;
    loading = true;
    error: string | null = null;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        const userId = localStorage.getItem('userId');
        if (userId) {
            this.loadUserData(parseInt(userId, 10));
        } else {
            this.error = 'User ID not found. Please log in again.';
            this.loading = false;
        }
    }

    loadUserData(userId: number): void {
        this.userService.getUserProfile(userId).subscribe({
            next: (userData) => {
                this.user = userData;
                if (userData.bankAccountId) {
                    this.loadAccountData(userId);
                } else {
                    this.loading = false;
                }
            },
            error: (err) => {
                console.error('Error loading user data:', err);
                this.error = 'Failed to load user data. Please try again.';
                this.loading = false;
            }
        });
    }

    loadAccountData(userId: number): void {
        this.userService.getUserAccount(userId).subscribe({
            next: (accountData) => {
                this.account = accountData;
                this.loading = false;
            },
            error: (err) => {
                if (err.status === 404) {
                    // User doesn't have an account yet, this is expected
                    this.loading = false;
                } else {
                    console.error('Error loading account data:', err);
                    this.error = 'Failed to load account data. Please try again.';
                    this.loading = false;
                }
            }
        });
    }

    createBankAccount(): void {
        if (this.user) {
            this.loading = true;
            this.error = null;
            this.userService.createBankAccount(Number(this.user.id)).subscribe({
                next: (accountData) => {
                    this.account = accountData;
                    this.loadUserData(Number(this.user!.id));
                },
                error: (err) => {
                    console.error('Error creating bank account:', err);
                    this.error = 'Failed to create bank account. Please try again.';
                    this.loading = false;
                }
            });
        }
    }
} 