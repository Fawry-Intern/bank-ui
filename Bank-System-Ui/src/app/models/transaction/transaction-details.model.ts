import { TransactionType } from "../../enums/transaction-type.model"

export interface TransactionDetails {
    id: number;
    accountId: number;
    type: TransactionType;
    note: string;
    amount: number;
    createdAt: Date;
}