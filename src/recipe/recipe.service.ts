import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  findOne(id: string): Promise<Recipe> {
    return this.recipeRepository.findOne({ where: { id: Number(id) } });
  }

  async create(recipe: Recipe): Promise<Recipe> {
    return await this.recipeRepository.save(recipe);
  }

  async update(id: string, recipe: Recipe): Promise<Recipe> {
    // eslint-disable-next-line prettier/prettier
    const toUpdate = await this.recipeRepository.findOne({ where: { id: Number(id) } });
    const updated = Object.assign(toUpdate, recipe);
    return await this.recipeRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.recipeRepository.delete(id);
  }
}
