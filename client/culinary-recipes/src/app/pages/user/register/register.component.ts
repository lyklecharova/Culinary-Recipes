import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { EMAIL_DOMAINS } from 'src/app/constants/constants';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorMessage1 = '';
  errorMessage2 = '';
  form = this.fb.group({
    //controls
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'confirmPassword')],
      }
    ),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  // Проверка дали потребителят е вече логнат, ако е, пренасочва към началната страница

  ngOnInit(): void {
    if (this.userService.isLogged) {
      this.router.navigateByUrl('/');
    }
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, passGroup: { password, confirmPassword } = {} } =
      this.form.value;
    this.userService.register(email!, password!, confirmPassword!).subscribe(
      () => {
        this.router.navigateByUrl('/');
      },
      (error) => {
        if (error === 'User already exists') {
          this.errorMessage1 = 'A user with this email already exists.';
          this.errorMessage2 =
            'Please use a different email or log in with your existing account.';
        } else {
          this.errorMessage1 = 'An error occurred during registration.';
          this.errorMessage2 = 'Please double-check your email and password';
        }
        setTimeout(()=>{
          this.clearError();
        },5000)
      }
    );

    console.log(this.form.value);
  }
  clearError() {
    this.errorMessage1 = '';
    this.errorMessage2 = '';
  }
}
