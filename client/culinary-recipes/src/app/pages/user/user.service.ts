import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Subscription, tap } from 'rxjs';

import { UserForAuth } from 'src/app/types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  api = 'http://localhost:3030';

  // Създаване на BehaviorSubject, който съхранява информация за текущо логнатия потребител
  private user$$ = new BehaviorSubject(<UserForAuth | undefined>undefined);
  // Observable, който може да бъде абониран от компонентите за получаване на информация за текущо логнатия потребител
  private user$ = this.user$$.asObservable();

  // Променлива, която съхранява информация за текущо логнатия потребител
  user: UserForAuth | undefined;
  // Ключ за съхранение на информацията за потребителя в localStorage
  USER_KEY = '[user]';
  // Абонамент за user$, използван за управление на данните за текущо логнатия потребител
  userSubscription: Subscription;

  // Метод за проверка дали потребителят е логнат
  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient, private router: Router) {
    // Абониране за user$ и актуализиране на user при промяна
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });

    // Възстановяване на информацията за логнатия потребител при зареждане на приложението

    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      this.user$$.next(JSON.parse(storedUser));
    }
  }

  register(email: string, password: string, confirmPassword: string) {
    return (
      this.http
        .post<UserForAuth>(`${this.api}/user/register`, {
          email,
          password,
          confirmPassword,
        })
        // Използване на оператора pipe за обработка на поток от данни
        .pipe(
          // Използване на оператора tap за извършване на допълнителни действия, без да променяме данните
          // tap((user) => this.user$$.next(user)
          // )

          tap((user) => {
            this.user$$.next(user);
            // Запазване на информацията за логнатия потребител в localStorage
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          })
        )
    );
  }

  login(email: string, password: string) {
    return (
      this.http

        .post<UserForAuth>(`${this.api}/user/login`, { email, password })
        // След като получим отговор от сървъра, използваме оператора tap за обновяване на данните за потребителя
        .pipe(
          // Операторът tap позволява да изпълним допълнителна логика без да променяме резултата от заявката
          // обновяване на данните за потребителя в BehaviorSubject user$$
          // tap((user) => this.user$$.next(user))

          tap((user) => {
            this.user$$.next(user);
            // Запазване на информацията за логнатия потребител в localStorage
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          })
        )
    );
  }

  logout() {
    // Актуализиране на данните за текущо логнатия потребител със стойност undefined
    this.user$$.next(undefined);

    // Изтриване на информацията за логнатия потребител от localStorage
    localStorage.removeItem(this.USER_KEY);

    // Навигация към началната страница
    this.router.navigate(['/']);
  }

  getIsLogged(): boolean {
    // Проверка дали потребителят е логнат, като вземаме информацията от localStorage
    return !!localStorage.getItem(this.USER_KEY);
  }

  ngOnDestroy(): void {
    // Освобождаване на ресурсите, свързани с абонамента за user$
    this.userSubscription.unsubscribe();
  }
}
