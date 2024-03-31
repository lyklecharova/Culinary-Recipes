import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from 'src/app/types/recipe';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId: string = '';
  recipes: Recipe[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') as string;
    this.api.getRecipesByUser(this.userId).subscribe((recipe) => {
      this.recipes = recipe;
    });
  }
}
