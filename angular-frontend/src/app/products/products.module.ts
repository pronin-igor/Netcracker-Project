import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from "./home/home.component";
import { SliderComponent } from './slider/slider.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { RegisterComponent } from './register/register.component';
import { AutLayoutComponent } from './shared/layouts/aut-layout/aut-layout.component';

@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    ProductComponent,
    LoginComponent,
    BasketComponent,
    RegisterComponent,
    AutLayoutComponent,
  ],
  exports: [],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ProductsModule { }
