import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

import { ProductsService } from "../products.service";

@Component({
  selector: 'app-reactive-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription | undefined;

  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      } else if (params['acessDenied']) {

      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  Submit() {
    this.form.disable();
    this.aSub = this.productsService.login(this.form.value).subscribe({
      next: () => {this.router.navigate(['/overview'])},
      error: () => {
      this.form.enable();
      }
  });
  }
}
