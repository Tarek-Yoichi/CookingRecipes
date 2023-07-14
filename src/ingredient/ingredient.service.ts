import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { Recipe } from '../entities/recipe.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
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

  async update(id: string, ingredient: Ingredient): Promise<Ingredient> {
    // eslint-disable-next-line prettier/prettier
    const toUpdate = await this.ingredientRepository.findOne({ where: { id: Number(id) } });
    const updated = Object.assign(toUpdate, ingredient);
    return await this.ingredientRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    // eslint-disable-next-line prettier/prettier
    const isIngredientUsed = await this.recipeRepository.createQueryBuilder("recipe")
      // eslint-disable-next-line prettier/prettier
      .innerJoin("recipe.ingredients", "ingredient", "ingredient.id = :id", { id: Number(id) })
      .getOne();
    if (isIngredientUsed) {
      // eslint-disable-next-line prettier/prettier
      throw new HttpException('Ingredient is used in a recipe', HttpStatus.CONFLICT);
    }
    await this.ingredientRepository.delete(id);
  }
}
