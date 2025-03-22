import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserDetails } from "../models/user/user-details.model";
import { PasswordResetRequest } from "../dtos/user/password-reset-request.model";
import { PasswordChangeRequest } from "../dtos/user/password-change-request.model";
import { User } from '../models/user.model';
import { Account } from '../models/account.model';
import { TransactionDetails } from "../models/transaction/transaction-details.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = 'http://localhost:8081/api/user';
    private apiUrl = 'http://localhost:8081/api';
    private headers: HttpHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient) {
        this.updateHeaders();
    }

    private updateHeaders(): void {
        this.headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        });
    }

    getUserProfile(userId: Number): Observable<UserDetails> {
        this.updateHeaders();
        return this.httpClient.get<UserDetails>(`${this.userUrl}/${userId}`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting user details failed:', error);
                throw error;
            })
        );
    }

    getAllUsers(): Observable<UserDetails[]> {
        this.updateHeaders();
        return this.httpClient.get<UserDetails[]>(`${this.userUrl}`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting all users failed:', error);
                throw error;
            })
        );
    }

    getAllUsersWithActiveAccounts(): Observable<UserDetails[]> {
        this.updateHeaders();
        return this.httpClient.get<UserDetails[]>(`${this.userUrl}/active-account`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting users with active accounts failed:', error);
                throw error;
            })
        );
    }

    getAllUsersWithBlockedAccounts(): Observable<UserDetails[]> {
        this.updateHeaders();
        return this.httpClient.get<UserDetails[]>(`${this.userUrl}/un-active-account`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting users with blocked accounts failed:', error);
                throw error;
            })
        );
    }

    activateUser(userId: Number): Observable<UserDetails> {
        this.updateHeaders();
        return this.httpClient.put<UserDetails>(`${this.userUrl}/activate/${userId}`, [], { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Activating user failed:', error);
                throw error;
            })
        );
    }

    deactivateUser(userId: Number): Observable<UserDetails> {
        this.updateHeaders();
        return this.httpClient.put<UserDetails>(`${this.userUrl}/deactivate/${userId}`, [], { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Deactivating user failed:', error);
                throw error;
            })
        );
    }

    resetUserAccountPassword(passwordResetRequest: PasswordResetRequest): Observable<Number> {
        this.updateHeaders();
        return this.httpClient.put<Number>(`${this.userUrl}/reset-password`, passwordResetRequest, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Reset password failed:', error);
                throw error;
            })
        );
    }

    changeUserAccountPassword(passwordChangeRequest: PasswordChangeRequest): Observable<Number> {
        this.updateHeaders();
        return this.httpClient.put<Number>(`${this.userUrl}/change-password`, passwordChangeRequest, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Change password failed:', error);
                throw error;
            })
        );
    }

    getUserAccount(userId: number): Observable<Account> {
        this.updateHeaders();
        return this.httpClient.get<Account>(`${this.apiUrl}/account/user/${userId}`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting user account failed:', error);
                throw error;
            })
        );
    }

    createBankAccount(userId: number): Observable<Account> {
        this.updateHeaders();
        return this.httpClient.post<Account>(`${this.apiUrl}/account`, { userId }, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Creating bank account failed:', error);
                throw error;
            })
        );
    }

    getAccountTransactions(accountId: number): Observable<TransactionDetails[]> {
        this.updateHeaders();
        return this.httpClient.get<TransactionDetails[]>(`${this.apiUrl}/account/${accountId}/transactions`, { headers: this.headers }).pipe(
            catchError((error) => {
                console.error('Getting account transactions failed:', error);
                throw error;
            })
        );
    }

    deposit(data: { accountId: number; amount: number; note: string }): Observable<any> {
        this.updateHeaders();
        return this.httpClient.post(`${this.apiUrl}/transaction/deposit`, data, { headers: this.headers }).pipe(
            catchError(error => {
                console.error('Error processing deposit:', error);
                return throwError(() => error);
            })
        );
    }

    withdraw(data: { accountId: number; amount: number; note: string }): Observable<any> {
        this.updateHeaders();
        return this.httpClient.post(`${this.apiUrl}/transaction/withdraw`, data, { headers: this.headers }).pipe(
            catchError(error => {
                console.error('Error processing withdrawal:', error);
                return throwError(() => error);
            })
        );
    }
}