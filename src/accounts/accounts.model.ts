import { Field, ObjectType } from '@nestjs/graphql';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Human } from '../humans/humans.model';
import { TransactionModel } from '../transactions/transaction.model';

export enum AccountTypes {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  INVESTMENTS = 'INVESTMENTS',
  LOAN = 'LOAN',
}

@ObjectType()
export class Account {
  @Field({ description: 'ID of account' })
  _id?: string;

  @Field({ description: 'name of account' })
  @prop({ unique: true })
  name: string;

  @Field({ description: 'unique readale identifier account' })
  @prop()
  accountName: string;

  @Field({ description: 'routing number for banking instition' })
  @prop()
  routingNumber: string;

  @Field(() => Human, { description: 'human who owns the account' })
  @prop({ ref: Human })
  human: Ref<Human>;

  @Field({ description: 'amound of funds in account' })
  @prop({ default: 0 })
  balance: number;

  @Field({ description: 'if account is active or not' })
  @prop({ default: true })
  active: boolean;

  @Field({
    description: 'three-letter code for currency of account funds',
  })
  @prop({ type: String, default: 'USD' })
  currency: string;

  @Field({ description: 'type of account' })
  @prop({ default: 'CASH' })
  type: AccountTypes;
}

export const AccountModel = getModelForClass(Account);
