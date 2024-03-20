import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  currentRecipeId?: string = '';
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const recipeId = this.route.snapshot.params['id'];
    this.api.getOneRecipe(recipeId).subscribe((recipe) => {
      this.recipe = recipe;
      this.currentRecipeId = recipe._id;
    });
  }
  
}
