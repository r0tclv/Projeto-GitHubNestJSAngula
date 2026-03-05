import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(Number(id));
  }

}