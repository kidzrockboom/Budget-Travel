import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { Request } from '../models/Request';

import { User } from '../models/User';
import { BehaviorSubject, catchError, first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Url path for the server 
  private url = "http://localhost:8080";

  // Check if the user is logged in and store user Details
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  userID: Pick<User, "id"> | undefined;    

  checkLogin () {
    if(localStorage.hasOwnProperty("Token")){
      this._isLoggedIn$.next(true);
    }
  }

  

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"}),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { 
    this.checkLogin();
  }


  // Register service 
  signup(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    )
  }
  // Login service
  setLocalStorage(request: Request) {
    return (
      request.hasOwnProperty('token') && 
      localStorage.setItem('Token', request.token)
    );
  }

  login(data: object) {
    return this.http.post<Request>(`${this.url}/login`, data).pipe(
      tap((res) => {
        this.setLocalStorage(res);
        this._isLoggedIn$.next(true);
        this.router.navigate(['trips'])
      }),
      catchError((err) => {
        const {error} = err;

        return new Observable((res) => {
          let reqData = {}

          if(err.status === 401) {
            reqData = {
              message: error.message,
              status: error.status,
              token: error.token
            }
          } else {
            reqData = {
              message: error.statusText,
              status: error.status,
              token: ''
            };
          }
          res.next(reqData);
        })
      })
    )
  }
  
  // Get user profile info 
  getProfile() {
    const token = localStorage.getItem("Token");
    return this.http.get(`${this.url}/users/profile`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }).pipe(
      
      catchError((error) => {
        return new Observable((res) => {
          const reqData = {
              message: error.statusText,
              status: error.status
            }

            res.next(reqData)
        })
      })
    )
  }


  // Log user out
  logout() {
    localStorage.removeItem("Token");
    this._isLoggedIn$.next(false);
    this.router.navigate([""]);
    window.location.reload();
  }
}
