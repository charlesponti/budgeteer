/**
 * TODO (charlesponti) Add ability to add snapshot budget over time
 */

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Human } from '../humans/humans.model';

@ObjectType()
export class Budget {
  total: number;
  piggybank = 0;

  @Field(() => ID, { description: 'ID of Budget' })
  _id?: string;

  @Field({ description: 'Cost of housing (mortgage, rent, etc.' })
  @prop({ default: 0 })
  housing: number;

  @Field({ description: `Savings` })
  @prop({ default: 0 })
  savings: number;

  @Field({ description: `Utilities - electrity, gas, etc.` })
  @prop({ default: 0 })
  utilities: number;

  @Field({ description: `Insurance - health, home, auto, life, etc.` })
  @prop({ default: 0 })
  insurance: number;

  @Field({
    description: `Groceries should equal - ($3 * number of dependents including self) * 3 meals per day * 30.5 (365 days / 12 months)`,
  })
  @prop({ default: 0 })
  groceries: number;

  @Field({
    description: 'Cloud services includes costs for email, data storage, etc.',
  })
  @prop({ default: 0 })
  cloud_services: number;

  @Field(() => Human, { description: 'Human who this budget belongs to' })
  @prop({ ref: Human })
  human: Ref<Human>;
}

export const BudgetModel = getModelForClass(Budget);
