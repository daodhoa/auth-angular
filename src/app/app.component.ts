import { Component } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth';

  user$: Observable<User | null> = merge(
    this.authService.getMe(),
    this.authService.getUser()
  )

  constructor(private authService: AuthService) {
  }

}
