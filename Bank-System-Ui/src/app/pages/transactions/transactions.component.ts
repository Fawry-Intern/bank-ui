import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserSidebarComponent } from '../../components/user-sidebar/user-sidebar.component';
import { UserDetails } from '../../models/user/user-details.model';
import { Account } from '../../models/account.model';
import { TransactionDetails } from '../../models/transaction/transaction-details.model';
import { TransactionType } from '../../enums/transaction-type.model';
import { FilterTransactionsPipe } from '../../pipes/filter-transactions.pipe';
import { SumTransactionsPipe } from '../../pipes/sum-transactions.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    UserSidebarComponent, 
    FilterTransactionsPipe, 
    SumTransactionsPipe,
    RouterLink
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  userData: UserDetails | null = null;
  accountData: Account | null = null;
  transactions: TransactionDetails[] = [];
  loading = true;
  error: string | null = null;
  TransactionType = TransactionType; // Make enum available in template

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
        if (accountData.id) {
          this.loadTransactions(accountData.id);
        } else {
          this.loading = false;
        }
      },
      error: (error: any) => {
        if (error.status === 404) {
          this.loading = false;
        } else {
          console.error('Error loading account data:', error);
          this.error = 'Failed to load account data';
          this.loading = false;
        }
      }
    });
  }

  loadTransactions(accountId: number): void {
    this.userService.getAccountTransactions(accountId).subscribe({
      next: (transactions: TransactionDetails[]) => {
        this.transactions = transactions;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading transactions:', error);
        this.error = 'Failed to load transactions';
        this.loading = false;
      }
    });
  }

  getTransactionIcon(type: TransactionType): string {
    return type === TransactionType.DEPOSIT ? 'fa-arrow-down' : 'fa-arrow-up';
  }

  getTransactionColor(type: TransactionType): string {
    return type === TransactionType.DEPOSIT ? 'text-success' : 'text-danger';
  }

  getTransactionTypeLabel(type: TransactionType): string {
    return type === TransactionType.DEPOSIT ? 'Deposit' : 'Withdrawal';
  }

  getTotalTransactions(type: TransactionType): number {
    return this.transactions
      .filter(t => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  }
} 