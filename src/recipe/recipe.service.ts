import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find({ relations: ['ingredients'] });
  }

  findOne(id: string): Promise<Recipe> {
    // eslint-disable-next-line prettier/prettier
    return this.recipeRepository.findOne({ where: { id: Number(id) }, relations: ['ingredients'] });
  }

  async create(recipe: Recipe): Promise<Recipe> {
    if (recipe.ingredients) {
      const ingredients = await this.ingredientRepository.find({
        where: { id: In(recipe.ingredients) },
      });
      recipe.ingredients = ingredients;
    }
    return await this.recipeRepository.save(recipe);
  }

  async update(id: string, recipe: Recipe): Promise<Recipe> {
    // eslint-disable-next-line prettier/prettier
    const toUpdate = await this.recipeRepository.findOne({ where: { id: Number(id) }, relations: ['ingredients'] });
    console.log('recipe name', recipe);
    if (toUpdate.name !== recipe.name) {
      console.log('recipe name', recipe);
      console.log('BAZINGA');
    }
    if (recipe.ingredients) {
      const ingredients = await this.ingredientRepository.find({
        where: { id: In(recipe.ingredients) },
      });
      recipe.ingredients = ingredients;
    }
    const updated = Object.assign(toUpdate, recipe);
    return await this.recipeRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.recipeRepository.delete(id);
  }
}
