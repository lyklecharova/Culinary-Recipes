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
  recipe: Recipe = {
    title: '',
    description: '',
    ingredients: [],
    image: '',
    instructions: [],
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params['id'];
    // Load the recipe data for editing
    this.api.getOneRecipe(this.currentId).subscribe((recipe) => {
      this.recipe = recipe;
    });
  }

  editRecipe(form: NgForm): void {
    if (form.valid) {
      // Submit the edited recipe
      this.api.editRecipe(this.recipe, this.currentId).subscribe((result) => {
        console.log('Recipe edited successfully:', result);
        // Redirect after successful recipe edit
        this.router.navigate(['/recipes']);
      });
    } else {
      console.log('Please fill in all required fields.');
    }
  }
}
