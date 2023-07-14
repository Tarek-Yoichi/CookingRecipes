// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from '../entities/recipe.entity';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.findOne(id);
  }

  @Post()
  create(@Body() recipe: Recipe): Promise<Recipe> {
    console.log('RECIPE', recipe);
    return this.recipeService.create(recipe);
  }

  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  update(@Param('id') id: string, @Body() recipe: Recipe): Promise<Recipe> {
    return this.recipeService.update(id, recipe);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.recipeService.remove(id);
  }
}
