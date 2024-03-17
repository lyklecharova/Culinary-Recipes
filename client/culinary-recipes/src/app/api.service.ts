import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Recipe } from './types/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRecipes(){
    const { API_URL } = environment;	
    return this.http.get<Recipe[]>(`${API_URL}/recipe`);
  }
  
  createRecipe(title: string) {
    const { API_URL } = environment;
    const payload = { title };
    return this.http.post<Recipe>(`${API_URL}/recipe`, payload); // Use correct interpolation for API_URL
  }

  getOneRecipe(id: string) {
    const { API_URL } = environment;
    return this.http.get<Recipe>(`${API_URL}/recipe/${id}`);
  }
}
