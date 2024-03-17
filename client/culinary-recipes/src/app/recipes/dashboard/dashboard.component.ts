import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
