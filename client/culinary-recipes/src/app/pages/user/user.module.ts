import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule, // Template Driven Appraoch
    ReactiveFormsModule,
  ],
})
export class UserModule {}
