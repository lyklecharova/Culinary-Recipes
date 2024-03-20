import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(private api: ApiService, private router: Router) {}

  addRecipe(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.api.createRecipe(form.value).subscribe((result) => {
        // console.log(result);
      });
    }
    this.router.navigate(['/recipes'])
  }
}
