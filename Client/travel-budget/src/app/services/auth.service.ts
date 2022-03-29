import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';

import { User } from '../models/User';
import { catchError, first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"}),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService
  ) { }

  signup(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    )
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{
    token: String; userID: Pick<User, "id">
  }> {
    return this.http
    .post(`${this.url}/login`, { email, password }, this.httpOptions)
    .pipe(
      first(),
      tap((tokenObject: { token: String; userID: Pick<User, "id">}) => {
        
      }),
      catchError(this.errorHandlerService.handleError<{
    token: String; userID: Pick<User, "id">
  }>("login"))
    )
  }
}
