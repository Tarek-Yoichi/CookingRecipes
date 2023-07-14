import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  findOne(id: string): Promise<Ingredient> {
    return this.ingredientRepository.findOne({ where: { id: Number(id) } });
  }

  async create(ingredient: Ingredient): Promise<Ingredient> {
    return await this.ingredientRepository.save(ingredient);
  }
}
