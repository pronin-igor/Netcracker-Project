import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { Response } from 'express';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(@Res() response: Response): Promise<any> {
    return this.productsService.getAll(response);
  }

  @Get(':id')
  getById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    return this.productsService.getById(id, response);
  }
}
