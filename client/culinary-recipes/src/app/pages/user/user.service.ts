import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

import { UserForAuth } from 'src/app/types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  api = 'http://localhost:3030';

  private user$$ = new BehaviorSubject(<UserForAuth | undefined>undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  USER_KEY = '[user]';
  userSubscription: Subscription;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(email: string, password: string, confirmPassword: string) {
    return this.http
      .post<UserForAuth>(`${this.api}/user/register`, {
        email,
        password,
        confirmPassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${this.api}/user/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    this.user$$.next(undefined);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}