// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Ingredient } from './ingredient.entity';

export enum RecipeType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
}

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: RecipeType,
  })
  type: RecipeType;

  @Column()
  description: string;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];
}
