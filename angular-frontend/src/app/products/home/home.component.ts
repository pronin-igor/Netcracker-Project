import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";

import { Product } from "../shared/interfaces";

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  products: any;

  constructor(private httpService: ProductsService) { }

  ngOnInit(): void {
    this.httpService.getAllProducts().subscribe((data: Product[]) => this.products = data);
  }

}
