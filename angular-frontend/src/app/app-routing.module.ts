import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./products/home/home.component";
import {ProductComponent} from "./products/product/product.component";
import {RegisterComponent} from "./products/register/register.component";
import {LoginComponent} from "./products/login/login.component";
import {BasketComponent} from "./products/basket/basket.component";
import {AppGuard} from "./app.guard";
import {AutLayoutComponent} from "./products/shared/layouts/aut-layout/aut-layout.component";

const routes: Routes = [
  {path: "exit", component: AutLayoutComponent, children: [
      {path: "", redirectTo: "login", pathMatch: "full"},
      {path: "login", component: LoginComponent},
      {path: "register", component: RegisterComponent},
    ]}
  //{ path: "", component: HomeComponent},
  //{path: "product/:productId", component: ProductComponent},
  //{ path: "register", component: RegisterComponent},
  //{ path: "login", component: LoginComponent},
  //{ path: "basket", component: BasketComponent, canActivate: [AppGuard]},
  //{ path: "**", component: HomeComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
