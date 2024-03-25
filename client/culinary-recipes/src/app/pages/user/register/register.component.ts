import { Component } from '@angular/core';
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
export class RegisterComponent {
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

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, passGroup: { password, confirmPassword } = {} } =
      this.form.value;
    this.userService
      .register(email!, password!, confirmPassword!)
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });

    console.log(this.form.value);
  }
}
