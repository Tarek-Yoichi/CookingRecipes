import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../entities/ingredient.entity';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  findAll(): Promise<Ingredient[]> {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientService.findOne(id);
  }

  @Post()
  create(@Body() ingredient: Ingredient): Promise<Ingredient> {
    console.log('INGREDIENT', ingredient);
    return this.ingredientService.create(ingredient);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ingredientService.remove(id);
  }
}
