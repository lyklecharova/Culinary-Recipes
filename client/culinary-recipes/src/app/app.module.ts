import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { UserModule } from './pages/user/user.module';
import { RecipesModule } from './recipes/recipes.module';
import { PagesModule } from './pages/pages.module';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { AuthenicateComponent } from './authenicate/authenicate.component';

@NgModule({
  declarations: [AppComponent, AuthenicateComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    PagesModule,
    UserModule,
    RecipesModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
    AuthenicateComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
