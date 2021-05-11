import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

  email: string | null = '';
  password: string | null = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.email && this.password) {
      this.authService.signIn(this.email, this.password).subscribe(
        () => this.router.navigate(['/'])
      );
    }
  }
}
