import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'The Category model' })
export class Category {
  @Field(() => ID, { description: 'ID of category' })
  _id: string;

  @Field({ description: 'Name of category' })
  @prop({ required: true, unique: true })
  name: string;

  @Field({ description: 'Percentage of income' })
  @prop({ required: true, default: 0, })
  percentage: number;
}

export const CategoryModel = getModelForClass(Category);