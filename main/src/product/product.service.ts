import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async list() {
    const [data, total] = await Promise.all([
      this.productModel.find(),
      this.productModel.count(),
    ]);
    return { data, total };
  }

  async create(data) {
    await this.productModel.create(data);
    console.log('product created');
  }

  async like(id) {
    const product = await this.productModel.findOne({ id });
    if (!product) throw new BadRequestException('Product not found.');
    const like = product.like + 1;
    await this.productModel.updateOne({ id }, { like });
    return { message: 'ok' };
  }

  async toggle(id) {
    const product = await this.productModel.findOne({ id });
    if (!product) throw new BadRequestException('Product not found.');
    const status = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await this.productModel.updateOne({ id }, { status });
    console.log('product toggled.');
  }

  async update(id, body) {
    const product = await this.productModel.findOne({ id });
    if (!product) throw new BadRequestException('Product not found.');
    await this.productModel.updateOne({ id }, body);
    console.log('product updated.');
  }
}
