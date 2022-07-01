import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {ProductsService} from "./products/products.service";

@Injectable({providedIn: 'root'})
export class AppGuard implements CanActivate, CanActivateChild {
  constructor(private productService: ProductsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.productService.isAuthenticated()) {
      return of(true);
    } else {
      this.router.navigate(['login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return of(false);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
