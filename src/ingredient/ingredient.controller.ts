import { Controller, Get, Post, Body } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../entities/ingredient.entity';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  findAll(): Promise<Ingredient[]> {
    return this.ingredientService.findAll();
  }

  @Post()
  create(@Body() ingredient: Ingredient): Promise<Ingredient> {
    console.log('INGREDIENT', ingredient);
    return this.ingredientService.create(ingredient);
  }
}
