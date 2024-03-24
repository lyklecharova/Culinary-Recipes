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
  // isLogged: boolean = true;
  get isLogged(): boolean {
    console.log(this.user.isLogged, ' RETUNR LOGIN INFOOOOO');
    return this.user.isLogged
  }

  logout() {
    this.user.logout();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }
}
