import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';


@NgModule({
  declarations: [
    HomeComponent,
    ErrorComponent,
    AboutUsComponent,
    ContactsComponent
  ],
  imports: [CommonModule],
})
export class PagesModule {}
