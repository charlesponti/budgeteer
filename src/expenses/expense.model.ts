import moment from 'moment';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Category } from '../categories/categories.model';

enum BILLING_PERIODS {
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  BIMONTHLY = 'BIMONTHLY',
  YEARLY = 'YEARLY',
  BIYEARLY = 'BIYEARLY',
}

@ObjectType({ description: 'The Expenses model' })
export class Expense {
  @Field(() => ID, { description: 'ID of expense' })
  _id?: string;

  @Field({ description: 'merchant or person to give money to' })
  @prop({ required: true })
  payee: string;

  @Field({ description: 'cost of expense' })
  @prop({ required: true })
  cost: number;

  @Field({ description: 'Day of month when bill is due' })
  @prop({ default: '1' })
  billingDay: string;

  @Field({ description: 'Is this expense, MONTHLY or YEARLY' })
  @prop({ required: true, default: BILLING_PERIODS.MONTHLY })
  billingPeriod: BILLING_PERIODS;

  @Field({ description: 'Date the human joined the service' })
  @prop()
  joined?: Date;

  @Field({ description: 'Account which is used to pay expense' })
  @prop({ required: true })
  account: string;

  @Field({
    description: 'ID of category which expense belongs to',
  })
  @prop({ required: true, ref: Category })
  category: string;

  @Field({ description: 'If expense is active' })
  @prop({ default: true })
  active: boolean;

  nextBillingDate(): string | undefined {
    const { billingDay, billingPeriod } = this;

    if (billingDay && billingPeriod) {
      switch (billingPeriod) {
        case BILLING_PERIODS.BIYEARLY:
          return moment(billingDay)
            .add(2, 'years')
            .toISOString();
        default:
          return billingPeriod;
      }
    }

    return undefined;
  }
}

export const ExpenseModel = getModelForClass(Expense);
