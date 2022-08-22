import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductBody } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}
  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  detail(@Param('id') id: number) {
    return this.service.detail(id);
  }

  @Post()
  async create(@Body() body: ProductBody) {
    const product = await this.service.create(body);
    this.client.emit('product_created', product);
    return product;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: ProductBody) {
    await this.service.update(id, body);
    this.client.emit('product_updated', { id, body });
    return { message: 'ok' };
  }

  @Put('toggle/:id')
  async toggle(@Param('id') id: number) {
    await this.service.toggle(id);
    this.client.emit('product_toggled', id);
    return { message: 'ok' };
  }

  async like(id: number) {
    await this.service.like(id);
    console.log(`product ${id} was like.`);
  }
}
