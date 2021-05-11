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

  private user$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private storageService: StorageService) { }

  signIn(email: string, password: string) :  Observable<User> {
    return this.http.post<AuthResponse>(SIGN_IN, { email, password })
      .pipe(
        tap (
          ({ access_token, user }) => {
            this.setUser(user);
            this.storageService.saveToken(access_token);
          }
        ),
        pluck('user')
      )
  }

  setUser(user: User | null) {
    this.user$.next(user);
  }

  getUser() : Observable<User> {
    return this.user$.asObservable();
  }

  getMe() : Observable<User> {
    const token: string | null = this.storageService.getToken();

    if (token === null) {
      return EMPTY;
    }

    return this.http.get<User>(GET_ME)
      .pipe(
        tap( (user) => {
          this.setUser(user) 
        }),
        pluck('user')
      )
  }

  getAccessTokenHeader() {
    const token: string | null = this.storageService.getToken() || '';
    console.log('token: --' + token);
    return { access_token : token }
  }

  logout() {
    this.storageService.clearToken();
    this.setUser(null);
  }
}
