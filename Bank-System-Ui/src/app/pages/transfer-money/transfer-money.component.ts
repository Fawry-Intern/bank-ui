import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserSidebarComponent } from '../../components/user-sidebar/user-sidebar.component';
import { UserDetails } from '../../models/user/user-details.model';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-transfer-money',
  standalone: true,
  imports: [CommonModule, FormsModule, UserSidebarComponent],
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
  userData: UserDetails | null = null;
  accountData: Account | null = null;
  loading = true;
  error: string | null = null;
  successMessage: string | null = null;
  activeTab: 'deposit' | 'withdraw' = 'deposit';
  
  // Form data
  amount: number = 0;
  note: string = '';
  processing = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.error = 'User ID not found';
      this.loading = false;
      return;
    }

    this.userService.getUserProfile(parseInt(userId)).subscribe({
      next: (userData: UserDetails) => {
        this.userData = userData;
        if (userData.bankAccountId) {
          this.loadAccountData(parseInt(userId));
        } else {
          this.loading = false;
        }
      },
      error: (error: any) => {
        console.error('Error loading user data:', error);
        this.error = 'Failed to load user data';
        this.loading = false;
      }
    });
  }

  loadAccountData(userId: number): void {
    this.userService.getUserAccount(userId).subscribe({
      next: (accountData: Account) => {
        this.accountData = accountData;
        this.loading = false;
      },
      error: (error: any) => {
        if (error.status === 404) {
          // User doesn't have an account yet, this is expected
          this.loading = false;
        } else {
          console.error('Error loading account data:', error);
          this.error = 'Failed to load account data';
          this.loading = false;
        }
      }
    });
  }

  handleDeposit(): void {
    if (!this.accountData?.id) {
      this.error = 'No bank account found';
      return;
    }

    if (this.amount <= 0) {
      this.error = 'Please enter a valid amount';
      return;
    }

    this.processing = true;
    this.error = null;
    this.successMessage = null;

    const depositData = {
      accountId: this.accountData.id,
      amount: this.amount,
      note: this.note || 'Deposit'
    };

    this.userService.deposit(depositData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Deposit successful!';
        this.amount = 0;
        this.note = '';
        if (this.userData?.id) {
          this.loadAccountData(parseInt(this.userData.id.toString()));
        }
      },
      error: (error: any) => {
        console.error('Error processing deposit:', error);
        this.error = 'Failed to process deposit. Please try again.';
      },
      complete: () => {
        this.processing = false;
      }
    });
  }

  handleWithdraw(): void {
    if (!this.accountData?.id) {
      this.error = 'No bank account found';
      return;
    }

    if (this.amount <= 0) {
      this.error = 'Please enter a valid amount';
      return;
    }

    if (this.amount > this.accountData.balance) {
      this.error = 'Insufficient funds';
      return;
    }

    this.processing = true;
    this.error = null;
    this.successMessage = null;

    const withdrawData = {
      accountId: this.accountData.id,
      amount: this.amount,
      note: this.note || 'Withdrawal'
    };

    this.userService.withdraw(withdrawData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Withdrawal successful!';
        this.amount = 0;
        this.note = '';
        if (this.userData?.id) {
          this.loadAccountData(parseInt(this.userData.id.toString()));
        }
      },
      error: (error: any) => {
        console.error('Error processing withdrawal:', error);
        this.error = 'Failed to process withdrawal. Please try again.';
      },
      complete: () => {
        this.processing = false;
      }
    });
  }

  setActiveTab(tab: 'deposit' | 'withdraw'): void {
    this.activeTab = tab;
    this.error = null;
    this.successMessage = null;
  }
} 