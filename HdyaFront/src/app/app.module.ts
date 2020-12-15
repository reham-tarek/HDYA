import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { ProfileComponent } from './Components/profile/profile.component';
import { EditComponent } from './Components/edit/edit.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
