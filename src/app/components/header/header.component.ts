import { Component, Input, OnInit } from '@angular/core';
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

  @Input() user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() : void {
    this.authService.logout();
    this.router.navigateByUrl('/sign-in');
  }
}
