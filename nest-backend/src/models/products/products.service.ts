import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { Product, ProductDocument } from './schemas/product.schema';
import { myError } from '../../utils/errorHandler';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAll(response: Response): Promise<any> {
    try {
      const products = await this.productModel.find();
      response.status(200).send(products);
    } catch (e) {
      myError(response, e);
    }
  }

  async getById(id: string, response: Response): Promise<any> {
    try {
      const product = await this.productModel.findById(id);
      response.status(200).send(product);
    } catch (e) {
      myError(response, e);
    }
  }
}
