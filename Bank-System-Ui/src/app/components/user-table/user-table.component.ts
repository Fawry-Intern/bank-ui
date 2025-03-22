import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDetails } from '../../models/user/user-details.model';
import { filter } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() users: UserDetails[] = [];
  filteredUsers: UserDetails[] = [];
  searchQuery = '';

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users']) {
      this.filterUsers();
    }
  }

  getActiveUsersCount(): number {
    return this.filteredUsers.filter(user => user.isActive).length;
  }

  getInactiveUsersCount(): number {
    return this.filteredUsers.filter(user => !user.isActive).length;
  }

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

  toggleUserStatus(user: UserDetails) {
    if (user.isActive === true) {
      this.userService.deactivateUser(user.id).subscribe({
        next: (response) => {
          user.isActive = false;
        },
        error: (error) => {
          console.error('Error deactivating user:', error);
        }
      });
    } else {
      this.userService.activateUser(user.id).subscribe({
        next: (response) => {
          user.isActive = true;
        },
        error: (error) => {
          console.error('Error activating user:', error);
        }
      });
    }
  }

  toggleBankAccountStatus(user: UserDetails) {
    if (!user.bankAccountId) {
      alert('User does not have a bank account');
      return;
    }

    if (user.bankAccountStatus === true) {
      this.accountService.deactivateAccount(user.bankAccountId).subscribe({
        next: (response) => {
          user.bankAccountStatus = false;
          this.refreshUserData(user.id);
        },
        error: (error) => {
          console.error('Error deactivating account:', error);
          alert('Failed to deactivate bank account');
        }
      });
    } else {
      this.accountService.activateAccount(user.bankAccountId).subscribe({
        next: (response) => {
          user.bankAccountStatus = true;
          this.refreshUserData(user.id);
        },
        error: (error) => {
          console.error('Error activating account:', error);
          alert('Failed to activate bank account');
        }
      });
    }
  }

  refreshUserData(userId: Number) {
    this.userService.getUserProfile(userId).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.filterUsers();
        }
      },
      error: (error) => {
        console.error('Error refreshing user data:', error);
      }
    });
  }

  viewUserDetails(user: UserDetails) {
    this.router.navigate(['/profile', user.id]);
  }

  deleteUser(user: UserDetails) {
    if (confirm(`Are you sure you want to delete user ${user.firstName} ${user.lastName}?`)) {
      // Implement delete user functionality
      console.log('Delete user:', user.id);
    }
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
