import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private open$ = new BehaviorSubject<Alert>({status: false, message: ''});

  constructor() { }

  showAlert(message: string) {
    this.open$.next({status: true, message});
  }

  getOpen(): Observable<Alert> {
    return this.open$.asObservable();
  }

  closeAlert() {
    this.open$.next({ status: false, message: '' });
  }
}
