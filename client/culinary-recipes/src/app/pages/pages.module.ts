import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    HomeComponent,
    ErrorComponent
  ],
  imports: [CommonModule],
})
export class PagesModule {}
