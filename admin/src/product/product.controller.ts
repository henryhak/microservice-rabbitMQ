import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductBody } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}
  @Get()
  all() {
    return this.service.list();
  }

  @Get(':id')
  detail(@Param() id: number) {
    return this.service.detail(id);
  }

  @Post()
  create(@Body() body: ProductBody) {
    return this.service.create(body);
  }

  @Put('toggle/:id')
  toggle(@Param() id: number) {
    return this.service.toggle(id);
  }
}
