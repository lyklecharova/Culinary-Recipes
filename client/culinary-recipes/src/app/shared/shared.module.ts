import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';



@NgModule({
  declarations: [
    EmailDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
