import {
  InputType,
  Field,
  Resolver,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Length } from 'class-validator';
import { Model } from 'mongoose';

import { Expense } from './expense.model';
import { ExpenseDocument } from './expense.interface';
import { CategoriesService } from '../categories/categories.service';
import { buildSearchQuery } from '../query';
import { AccountDTO } from '../accounts/accounts.dto';

@InputType()
export class ExpenseInput extends Expense {
  @Field({ description: 'id of account' })
  _id: string;

  @Field()
  @Length(1, 255)
  payee: string;
}

@Resolver('Expenses')
export class ExpensesResolver {
  constructor(
    @InjectModel('Expense') private model: Model<ExpenseDocument>,
    @InjectModel('Account') private accountService: Model<AccountDTO>,
    private categoryApi: CategoriesService
  ) { }

  @Query(() => [Expense])
  async getExpenses(@Args('query', { nullable: true }) query: ExpenseInput) {
    if (query && Object.keys(query).length > 0) {
      const q = buildSearchQuery(
        ['payee', 'billingPeriod', 'billingDay', 'account', 'category'],
        query,
      );

      if (query.joined) q.joined = q.joined;
      if (query.account)
        q.account = {
          $in: [await this.accountService.find({ name: query.account })],
        };
      if (query.category)
        q.category = {
          $in: [await this.categoryApi.find({ name: query.category })],
        };

      return await this.model.find(query).sort({ payee: 1 });
    }

    return await this.model.find();
  }

  @Query(returns => Expense, { nullable: false })
  async getExpense(@Args('id') id: string) {
    // const expense = await ExpenseModel.findById(Types.ObjectId(args.id));
    const expense = await this.model.findById(id);
    if (expense) return expense;
    throw new Error(
      `Expense with ID ${id} could not be fetched.  ` + 'CAN_NOT_FETCH_BY_ID',
    );
  }

  @Mutation(() => Expense)
  async createExpense(
    @Args('data', { type: () => ExpenseInput }) expense: ExpenseInput,
  ): Promise<ExpenseDocument> {
    const category = await this.model.create(expense);
    return category;
  }

  @Mutation(() => Boolean)
  async deleteExpense(@Args('id') id: string) {
    try {
      await this.model.deleteOne({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  }

  @Mutation(() => Expense)
  async updateExpense(@Args('expense') expense: ExpenseInput) {
    return await this.model.update({ _id: expense._id }, expense);
  }
}
