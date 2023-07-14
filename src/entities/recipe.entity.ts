// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];
}
