import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { URL_PATTERN } from 'src/app/constants/constants';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  imagePattern = URL_PATTERN;
  currentId: string = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  editRecipe(form: NgForm): boolean {
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

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params['id'];
  }
}

