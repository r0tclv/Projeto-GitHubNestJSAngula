import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.repo.save(dto);
  }
  async findAll(page: number, limit: number) {
    const [data, total] = await this.repo.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }
  async update(id: number, dto: CreateProductDto) {

    await this.repo.update(id, dto);
    return this.findOne(id);
  }
  async remove(id: number) {
    return this.repo.delete(id);
  }
}