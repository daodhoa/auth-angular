import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToken(token: string) {
    if (!token) return;
    localStorage.setItem('access_token', token);
  }

  getToken() : string {
    return localStorage.getItem('access_token');
  }

  clearToken() : void {
    localStorage.removeItem('access_token');
    localStorage.clear();
  }
}
