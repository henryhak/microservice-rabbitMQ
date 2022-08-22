import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBody } from './product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async list() {
    const [data, total] = await this.productRepository.findAndCount();
    return { data, total };
  }

  async create(body: ProductBody) {
    return this.productRepository.save(body);
  }

  async detail(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async toggle(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new BadRequestException('Product not found.');
    const status = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await this.productRepository.update({ id }, { status });
    return { massage: 'ok' };
  }

  async like(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new BadRequestException('Product not found.');
    const like = product.like + 1;
    await this.productRepository.update({ id }, { like });
  }

  async update(id: number, body: ProductBody) {
    const product = await this.productRepository.findOneBy({ id });
    console.log(product, id);
    if (!product) throw new BadRequestException('Product not found.');
    await this.productRepository.update({ id }, body);
    return { massage: 'ok' };
  }
}
