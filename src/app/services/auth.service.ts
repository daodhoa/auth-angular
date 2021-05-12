import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { GET_ME, SIGN_IN } from '../constants/httpUrl';
import { User } from '../models/user';
import { StorageService } from './storage.service';

interface AuthResponse {
  user: User;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new BehaviorSubject<User | null>(null);

  private isLoggedIn : boolean;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  signIn(email: string, password: string) :  Observable<User> {
    return this.http.post<AuthResponse>(SIGN_IN, { email, password })
      .pipe(
        tap (
          ({ access_token, user }) => {
            this.setUser(user);
            this.isLoggedIn = true;
            this.storageService.saveToken(access_token);
          }
        ),
        pluck('user')
      )
  }

  getIsLoggedIn() : boolean {
    return this.isLoggedIn;
  }

  setUser(user: User | null) {
    this.user$.next(user);
  }

  getUser() : Observable<User | null> {
    console.log("Call get user");
    return this.user$.asObservable();
  }

  getMe() : Observable<User | null> {
    const token: string | null = this.storageService.getToken();

    if (token === null) {
      return EMPTY;
    }
    return this.http.get<User>(GET_ME)
      .pipe(
        tap((user) => {
          this.setUser(user);
        })
      )
  }

  getAccessTokenHeader() {
    const token: string | null = this.storageService.getToken() || '';
    return { access_token : token }
  }

  logout() {
    this.storageService.clearToken();
    this.setUser(null);
  }
}
