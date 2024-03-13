import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(private api: ApiService) {}

 addRecipe(title: string){
    this.api.createRecipe(title).pipe(
      tap((data)=>{
        console.log(data)
      })
    )
 }
}
