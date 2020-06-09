import { Field, ID, ObjectType } from '@nestjs/graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';

import { Category } from '../categories/categories.model';
import { Human } from '../humans/humans.model';
import { Account } from '../accounts/accounts.model';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  _id?: string;

  @Field({ description: 'date transaction took place' })
  @prop({ default: Date.now })
  date: Date;

  @Field({ description: 'Person paid' })
  @prop({ required: true })
  payee: string;

  @Field({ description: 'total cost of transaction' })
  @prop({ required: true })
  amount: number;

  @Field({ description: 'Three letter currency code' })
  @prop({ required: true, default: 'USD' })
  currency: string;

  @Field({ description: 'Description of transaction' })
  @prop({ default: '' })
  description: string;

  @Field({ description: 'Original record in json serialized format' })
  @prop()
  metadata: string;

  @Field(() => Category, { description: 'category of transaction' })
  @prop({ ref: Category, autopopulate: true, required: true })
  category: Category;

  @Field(() => Account, { description: 'Account user used to fulfill this transaction' })
  @prop({ ref: Account, autopopulate: true, required: true })
  account: Account;

  @Field(() => Human, { description: 'user who enacted transaction' })
  @prop({ ref: Human, autopopulate: true, required: true })
  human: Human;
}

export const TransactionModel = getModelForClass(Transaction)

export const TransactionSchema = TransactionModel.schema
