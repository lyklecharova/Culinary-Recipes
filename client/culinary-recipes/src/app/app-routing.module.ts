import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './recipes/dashboard/dashboard.component';
import { CreateComponent } from './recipes/create/create.component';
import { EditComponent } from './recipes/edit/edit.component';
import { ErrorComponent } from './pages/error/error.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { LoginComponent } from './pages/user/login/login.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DetailsComponent } from './recipes/details/details.component';
import { AuthenicateComponent } from './authenicate/authenicate.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'about-us', component: AboutUsComponent },
  { path: 'contacts', component: ContactsComponent },

  { path: 'recipes', component: DashboardComponent },

  {
    path: 'create-recipe',
    component: CreateComponent,
    canActivate: [AuthenicateComponent],
  },
  { path: 'recipe/:id', component: DetailsComponent },
  {
    path: 'edit-recipe/:id',
    component: EditComponent,
    canActivate: [AuthenicateComponent],
  },

  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthenicateComponent],
  },

  { path: '**', redirectTo: '/404' },
  { path: '404', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
