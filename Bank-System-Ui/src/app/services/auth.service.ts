import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequest } from "../dtos/user/register-request.model";
import { UserDetails } from "../models/user/user-details.model";
import { catchError, Observable } from "rxjs";
import { AuthRequest } from "../dtos/user/auth-request.model";
import { AuthDetails } from "../models/user/auth-details.model";
import { environment } from '../../environments/environment';
import { PasswordResetRequest } from "../dtos/user/password-reset-request.model";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    

    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(private httpClient:HttpClient)
    {
                               
    }
    register(registerRequest: RegisterRequest): Observable<String> {
        return this.httpClient
          .post<String>(`${this.apiUrl}/sign-up`, registerRequest)
          .pipe(
            catchError((error) => {
              console.error('Sign-up failed', error);
              throw error; 
            })
          );
      }
        
        authenticate(authRequest: AuthRequest): Observable<AuthDetails> {
            return this.httpClient
              .post<AuthDetails>(`${this.apiUrl}/login`,authRequest )
              .pipe(
                catchError((error) => {
                  console.error('Login failed', error);
                  throw error;
                })
              );
          }

    logout(): void {
        localStorage.clear();
    }

    forgotPassword(email: string): Observable<string> {
        return this.httpClient.post(`${environment.apiUrl}/user/reset-password-request`, { email }, { responseType: 'text' });
    }

    resetPassword(request: PasswordResetRequest): Observable< String > {
      return this.httpClient.put< String >(
        `${environment.apiUrl}/user/reset-password`, 
        request
      );
    }
}