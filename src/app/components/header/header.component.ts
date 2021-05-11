import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User | null = null;

  user$ : Observable<User | null> = merge(
    this.authService.getMe(),
    this.authService.getUser()
  )

  constructor(private authService: AuthService, private router: Router) {
    this.user$.subscribe((data) => {
      if (data) {
        this.user = {...data};
      } else {
        this.user = null;
      }
    });
  }

  ngOnInit(): void {
  }

  logout() : void {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
