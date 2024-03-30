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
  get isLogged(): boolean {
    // Връща стойността на свойството isLogged
    return this.user.isLogged;
  }

  logout() {
    this.user.logout();
    // Премахване на идентификатора на потребителя от localStorage
    localStorage.removeItem('userId');
    // Премахване на токена за достъп от localStorage
    localStorage.removeItem('token');
  }
}
 Г