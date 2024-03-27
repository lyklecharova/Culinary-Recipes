import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../pages/user/user.service';

@Component({
  selector: 'app-authenicate',
  templateUrl: './authenicate.component.html',
  styleUrls: ['./authenicate.component.css'],
})
export class AuthenicateComponent implements CanActivate {
  constructor(private user: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.user.isLogged) {
      return true;
    } else {
      // Пренасочване към страницата за вход, ако потребителят не е логнат
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
