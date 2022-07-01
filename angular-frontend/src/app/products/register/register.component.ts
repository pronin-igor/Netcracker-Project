import { Component, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { ProductsService } from "../products.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnDestroy {

  form: FormGroup;
  aSub: Subscription | undefined;

  constructor(private productsService: ProductsService, private router: Router) {
    this.form = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  Submit() {
    this.form.disable();
    this.aSub = this.productsService.register(this.form.value).subscribe({
      next: () => {this.router.navigate(['/exit/login'], {
        queryParams: {
          registered: true
        }
      })},
      error: () => {
        this.form.enable();
      }
    });
  }
}
