import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../user.service';
import { EMAIL_DOMAINS } from 'src/app/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  domains = EMAIL_DOMAINS;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe((token) => {
      localStorage.setItem('token', token.token);
      localStorage.setItem('userId', token.userId);
      this.router.navigateByUrl('/');
    },
    (error) => {
        // Handle login error
        console.error('Login error:', error);
        if (error === 'Invalid email or password') {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'Please check your email or password';
        }
      }
    );
  }
}
