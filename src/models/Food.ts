import { ObjectType, Field } from '@nestjs/graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
class Food {
  @Field({ description: 'Number of grams of carbs in food' })
  @prop()
  carbs: number;

  @Field({ description: 'Number of grams of fat in food' })
  @prop()
  fat: number;

  @Field({ description: 'Number of grams of protein in food' })
  @prop()
  protein: number;

  @Field({ description: 'Number of grams of protein in food' })
  @prop()
  fiber: number;

  /**
   * The insulin effect of a food is based on it's net carbs:
   * (carbs - fibre) + 0.54 protein
   */
  calculateNetCarbs(): number {
    const netCarbs = this.carbs - this.fiber;
    const netProtein = 0.54 * this.protein;
    return netCarbs * netProtein;
  }
}

export default getModelForClass(Food);
