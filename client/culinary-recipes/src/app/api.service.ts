import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Recipe } from './types/recipe';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getRecipes() {
    const { API_URL } = environment;
    return this.http.get<Recipe[]>(`${API_URL}/recipe`);
  }
  createRecipe(recipe: Recipe) {
    const { API_URL } = environment;
    const payload = recipe;
    return this.http.post<Recipe>(`${API_URL}/recipe/add`, payload);
  }

  getOneRecipe(id: string) {
    const { API_URL } = environment;
    return this.http.get<Recipe>(`${API_URL}/recipe/${id}`);
  }

  getRecipesByUser(userId: string): Observable<Recipe[]> {
    const { API_URL } = environment;
    return this.http.get<Recipe[]>(`${API_URL}/recipe`).pipe(
      map((recipes) =>
        recipes.filter((recipe) => {
          return recipe.ownerId === userId;
        })
      )
    );
  }

  editRecipe(recipe: Recipe, id: string) {
    const { API_URL } = environment;
    // Създава payload обект, който съдържа данните за рецептата
    const payload = recipe;
    // Изпраща PUT заявка към API за редактиране на съществуваща рецепта, като използва адреса на API, идентификатора на рецептата и payload обекта с новите данни за рецептата
    return this.http.put<Recipe>(`${API_URL}/recipe/${id}`, payload);
  }

  deleteRecipe(id: string) {
    // Взема JWT токена от локалното съхранение
    const token = localStorage.getItem('token');
    const headers = { Authorization: token };
    const { API_URL } = environment;
    // Изпраща DELETE заявка към сървъра за изтриване на рецептата със зададеното ID
    return this.http.delete<Recipe>(`${API_URL}/recipe/${id}`);
  }
}
