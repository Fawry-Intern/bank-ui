import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { AccountDetails } from "../models/account/account-details.model";

@Injectable({
    providedIn:'root'
})
export class AccountService{
    
     private accountUrl = 'http://localhost:8081/api/account';
     private headers: HttpHeaders;
        constructor(private httpClient:HttpClient)
        {
            this.headers = new HttpHeaders({
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
              });
        }

        //todo: For user dashboard: add get account details, create account, get account transactions 


        getAllAccounts():Observable<AccountDetails[]>{

            return this.httpClient.get<AccountDetails[]>(`${this.accountUrl}`,{headers:this.headers}).pipe(
                        catchError((error) => {
                          console.error('getting all accounts failed', error);
                          throw error; 
                        })
                      );
        }

        activateAccount(accountId:Number):Observable<AccountDetails>
        {
            return this.httpClient.put<AccountDetails>(`${this.accountUrl}/activate/${accountId}`,[],{headers:this.headers}).pipe(
                catchError((error) => {
                  console.error('activating account failed', error);
                  throw error; 
                })
              );
        }

        deactivateAccount(accountId:Number):Observable<AccountDetails>
        {
            return this.httpClient.put<AccountDetails>(`${this.accountUrl}/deactivate/${accountId}`,[],{headers:this.headers}).pipe(
                catchError((error) => {
                  console.error('deactivating account failed', error);
                  throw error; 
                })
              );
        }

        
       
    }