import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequest } from "../dtos/user/register-request.model";
import { UserDetails } from "../models/user/user-details.model";
import { catchError, Observable } from "rxjs";
import { AuthRequest } from "../dtos/user/auth-request.model";
import { AuthDetails } from "../models/user/auth-details.model";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    

    private authUrl = 'http://localhost:8081/api/auth';

    constructor(private httpClient:HttpClient)
    {
                               
    }
    register(registerRequest: RegisterRequest): Observable<String> {
        return this.httpClient
          .post<String>(`${this.authUrl}/sign-up`, registerRequest)
          .pipe(
            catchError((error) => {
              console.error('Sign-up failed', error);
              throw error; 
            })
          );
      }
        
        authenticate(authRequest: AuthRequest): Observable<AuthDetails> {
            return this.httpClient
              .post<AuthDetails>(`${this.authUrl}/login`,authRequest )
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
}