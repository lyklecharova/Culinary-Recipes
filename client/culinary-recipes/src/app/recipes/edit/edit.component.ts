import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  currentId: string = '';
  editRecipe(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.api.editRecipe(form.value, this.currentId).subscribe((result) => {
        // console.log(result);
      });
    }
  }
  ngOnInit(): void {
    this.currentId = this.route.snapshot.params['id'];
  }
}
