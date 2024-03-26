import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateComponent,
    DetailsComponent,
    EditComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, FormsModule],
  exports: [
    DashboardComponent,
    CreateComponent,
    DetailsComponent,
    EditComponent,
  ],
})
export class RecipesModule {}
