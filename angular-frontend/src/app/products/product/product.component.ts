import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ProductsService } from "../products.service";
import { Product } from "../shared/interfaces";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  product: Product = {
    src: '../../../assets/cards/Loading',
  };

  constructor(private httpService: ProductsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["productId"];
    this.httpService.getProductById(id).subscribe((data: Product) => this.product = data);
  }
}
