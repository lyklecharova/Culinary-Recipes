import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { URL_PATTERN } from 'src/app/constants/constants';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  imagePattern = URL_PATTERN;

  constructor(private api: ApiService, private router: Router) {}

  addRecipe(form: NgForm): boolean {
    if (form.valid) {
      // Кастване на form.value към тип 'Recipe'
      const formValues = form.value as Recipe;

      // Проверка за празни полета
      const isAnyFieldEmpty = Object.values(formValues).some((value: any) => {
        if (typeof value === 'string') {
          return value.trim() === '';
        }
        return false;
      });

      if (isAnyFieldEmpty) {
        // Показва грешка, ако има празни полета
        console.log('Please fill in all fields.');
        return false;
      }

      // Проверка за невалидни данни в description и ingredients
      if (
        typeof formValues.description === 'string' &&
        formValues.description.trim().length < 10
      ) {
        console.log('Description must be at least 10 characters long.');
        return false;
      }

      // Съединява елементите на масива ingredients в един низ с интервал между тях
      const ingredientsString = Array.isArray(formValues.ingredients)
        ? formValues.ingredients.join(' ')
        : formValues.ingredients;

      if (
        typeof ingredientsString === 'string' &&
        ingredientsString.trim().length < 10
      ) {
        console.log('Ingredients must be at least 10 characters long.');
        return false;
      }

      // Изпращане на данните до API
      this.api.createRecipe(form.value).subscribe((result) => {
        console.log('Recipe created successfully:', result);
        // Редирект след успешно създаване на рецепта
        this.router.navigate(['/recipes']);
      });

      // Връщаме true, за да покажем, че процесът е успешен
      return true;
    } else {
      console.log('Please fill in all required fields.');
      // Връщаме false, за да предотвратим навигацията към следващата страница
      return false;
    }
  }
}

