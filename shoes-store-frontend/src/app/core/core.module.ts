import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeroComponent,
    HomeComponent,
    RecommendedComponent,
    NewArrivalComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    HeroComponent,
    HomeComponent,
    RecommendedComponent,
    NewArrivalComponent,
    FooterComponent,
    LoginComponent
  ]
})
export class CoreModule { }
