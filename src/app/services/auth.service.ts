import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { SIGN_IN } from '../constants/httpUrl';
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
    if (user) {
      this.user$.next(user);
    }
  }

  getUser() : Observable<User> {
    return this.user$.asObservable();
  }

  
}
