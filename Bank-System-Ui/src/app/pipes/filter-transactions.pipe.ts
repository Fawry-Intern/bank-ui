import { Pipe, PipeTransform } from '@angular/core';
import { TransactionDetails } from '../models/transaction/transaction-details.model';
import { TransactionType } from '../enums/transaction-type.model';

@Pipe({
  name: 'filterTransactions',
  standalone: true
})
export class FilterTransactionsPipe implements PipeTransform {
  transform(transactions: TransactionDetails[], type: TransactionType): TransactionDetails[] {
    return transactions.filter(transaction => transaction.type === type);
  }
} 