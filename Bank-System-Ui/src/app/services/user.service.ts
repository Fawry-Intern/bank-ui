import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, ObservableLike } from "rxjs";
import { UserDetails } from "../models/user/user-details.model";
import { PasswordResetRequest } from "../dtos/user/password-reset-request.model";
import { PasswordChangeRequest } from "../dtos/user/password-change-request.model";

@Injectable({
    providedIn:'root'
})
export class UserService{


    private userUrl = 'http://localhost:8081/api/user';
    private headers:HttpHeaders;
    constructor(private httpClient:HttpClient)
    {
 this.headers = new HttpHeaders({
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
              });
    }

    getUserProfile(userId:Number):Observable<UserDetails>
    {
           return this.httpClient.get<UserDetails>(`${this.userUrl}/${userId}`,{headers:this.headers}).pipe(
                       catchError((error) => {
                         console.error('getting user details failed', error);
                         throw error; 
                       })
                     );
    }


    getAllUsers():Observable<UserDetails[]>
    {
        return this.httpClient.get<UserDetails[]>(`${this.userUrl}`,{headers:this.headers}).pipe(
            catchError((error) => {
              console.error('getting all users details failed', error);
              throw error; 
            })
          );
    }


    activateUser(userId:Number) :Observable<UserDetails>
    {
        return this.httpClient.put<UserDetails>(`${this.userUrl}/activate/${userId}`,[],{headers:this.headers}).pipe(
            catchError((error) => {
              console.error('activating user failed', error);
              throw error; 
            })
          );;
    }

    deactivateUser(userId:Number) :Observable<UserDetails>
    {
        return this.httpClient.put<UserDetails>(`${this.userUrl}/deactivate/${userId}`,[],{headers:this.headers}).pipe(
            catchError((error) => {
              console.error('deactivating user failed', error);
              throw error; 
            })
          );
    }

    resetUserAccountPassword(passwordResetRequest:PasswordResetRequest):Observable<Number>
    {
        return this.httpClient.put<Number>(`${this.userUrl}/reset-password`,passwordResetRequest,{headers:this.headers}).pipe(
            catchError((error) => {
              console.error('reset password failed', error);
              throw error; 
            })
          );
    }


     changeUserAccountPassword(passwordChangeRequest:PasswordChangeRequest):Observable<Number>
    {
        return this.httpClient.put<Number>(`${this.userUrl}/change-password`,passwordChangeRequest).pipe(
            catchError((error) => {
              console.error('change password failed', error);
              throw error; 
            })
          );
    }
}