import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    await this.service.like(id);

    return { message: 'ok' };
  }

  @EventPattern('product_created')
  async create(body) {
    this.service.create(body);
  }

  @EventPattern('product_toggled')
  async toggle(id) {
    this.service.toggle(id);
  }

  @EventPattern('product_updated')
  async update({ id, body }) {
    this.service.update(id, body);
  }
}
