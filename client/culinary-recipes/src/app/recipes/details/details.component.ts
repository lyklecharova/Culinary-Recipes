import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  userId = localStorage.getItem('userId');
  // recipeOwnerId = '';
  recipeOwnerId: string | undefined;
  isOwner: boolean = false;
  recipe: Recipe | undefined;
  currentRecipeId: string = '';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.params['id'];
    this.api.getOneRecipe(recipeId).subscribe((recipe) => {
      this.recipe = recipe;

      this.currentRecipeId = recipe._id as unknown as string;
      this.recipeOwnerId = recipe.ownerId as unknown as string;
    
      // Проверка и преобразуване на инструкциите и съставките
      if (typeof this.recipe.ingredients === 'string') {
        this.recipe.ingredients = (this.recipe.ingredients as string).split(
          '\n'
        );
      }
      if (typeof this.recipe.instructions === 'string') {
        this.recipe.instructions = (this.recipe.instructions as string).split(
          '\n'
        );
      }
    });
  }

  deleteRecipe(): void {
    this.api.deleteRecipe(this.currentRecipeId).subscribe(
      () => {
        console.log('Recipe deleted successfully');
        // Optionally, you can redirect to a different page after deletion
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.error('Error deleting recipe:', error);
        // Handle error
      }
    );
  }

  confirmDelete(): void {
    // Проверка дали текущият потребител е собственик на рецептата
    if (this.userId === this.recipeOwnerId) {
      const confirmed = confirm('Are you sure you want to delete this recipe?');
      if (confirmed) {
        this.deleteRecipe();
      }
    } else {
      alert('You are not authorized to delete this recipe.');
    }
  }
}
