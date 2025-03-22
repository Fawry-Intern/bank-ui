import { Pipe, PipeTransform } from '@angular/core';
import { TransactionDetails } from '../models/transaction/transaction-details.model';

@Pipe({
  name: 'sumTransactions',
  standalone: true
})
export class SumTransactionsPipe implements PipeTransform {
  transform(transactions: TransactionDetails[]): number {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }
} 