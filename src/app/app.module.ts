import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './api-interceptor.service';
import { RegisterComponent } from './components/register/register.component';
import { TaskComponent } from './components/task/task.component';
import { CompletedComponent } from './components/completed/completed.component';
import { TaskCompletedComponent } from './components/task-completed/task-completed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TaskComponent,
    CompletedComponent,
    TaskCompletedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
