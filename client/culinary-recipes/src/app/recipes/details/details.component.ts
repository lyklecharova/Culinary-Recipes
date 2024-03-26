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
  recipeOwnerId = '';
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
}
