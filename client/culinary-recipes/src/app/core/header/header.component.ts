import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  constructor(private user: UserService, private router: Router) {}
  isLogged: boolean = true;
  // get isLogged(): boolean {
  //   return this.user.isLogged
  // }
  

  logout() {
    this.user.logout();
  }
}