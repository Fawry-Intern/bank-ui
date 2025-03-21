import { TransactionType } from "../../enums/transaction-type.model"

export interface TransactionDetails{
    id:Number,
    accountId:Number,
    type:TransactionType,
     note:String,
    amount:Number,
    createdAt:Date
}