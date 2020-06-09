import {
  Resolver,
  Query,
  ArgsType,
  Mutation,
  InputType,
  Field,
  Args,
  ObjectType,
} from '@nestjs/graphql';
// import moment from 'moment'

import { TransactionService } from './transactions.service';
import { Transaction } from './transaction.model';
import { HumansService } from 'src/humans/humans.service';

@ArgsType()
export class GetTransactionsRequest {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  payee?: string;

  @Field(() => String, { nullable: true })
  account?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => String, { nullable: true })
  before?: string;
}

@InputType()
export class TransactionInput {
  @Field({ nullable: false })
  payee: string;
  @Field({ nullable: false })
  amount: number;
  @Field({ nullable: true })
  date: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: false })
  account: string;
  @Field({ nullable: false })
  category: string;
}

@InputType()
export class UpdateTransactionInput extends TransactionInput {
  @Field({ nullable: true })
  _id: string;
}

@ObjectType()
class YearlySummary {
  @Field({ nullable: false })
  January: number;
  @Field({ nullable: false })
  February: number;
  @Field({ nullable: false })
  March: number;
  @Field({ nullable: false })
  April: number;
  @Field({ nullable: false })
  May: number;
  @Field({ nullable: false })
  June: number;
  @Field({ nullable: false })
  July: number;
  @Field({ nullable: false })
  August: number;
  @Field({ nullable: false })
  September: number;
  @Field({ nullable: false })
  October: number;
  @Field({ nullable: false })
  Novement: number;
  @Field({ nullable: false })
  December: number;
}

@Resolver(of => Transaction)
export class TransactionsResolver {
  constructor(
    private transactionService: TransactionService,
    private humanService: HumansService
  ) { }

  @Query(() => [Transaction], { nullable: false })
  async getTransactions(@Args() query: GetTransactionsRequest) {
    const records = await this.transactionService.find(query);
    return records;
  }

  @Query(() => Transaction, { nullable: false })
  async getTransaction(@Args() { _id }: GetTransactionsRequest) {
    if (!_id) return { message: 'Must supply _id of transaction' };

    return (await this.transactionService.findOne(_id))?.toJSON();
  }

  @Mutation(() => Transaction)
  async createTransaction(@Args('transaction') transaction: TransactionInput) {
    const currentUser = await this.humanService.currentUser()
    return await this.transactionService.save({
      ...transaction,
      human: currentUser._id
    });
  }

  @Mutation(() => Boolean)
  async updateTransaction(@Args('transaction') transaction: UpdateTransactionInput) {
    return await this.transactionService.update(transaction);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(@Args('id') id: string) {
    return await this.transactionService.delete(id);
  }

  // @Query(() => YearlySummary)
  // async getYearlySummary(@Args() query: GetTransactionsRequest) {
  //   // Get all transactions
  //   const transactions = await this.transactionService.find();

  //   // Get all categories
  //   const categories = await this.categoriesService.find();

  //   const categoryMap = categories.reduce((result, category) => {
  //     result[category.name] = 0
  //     return result
  //   }, {})
  //   console.log(transactions.length)

  //   const report = moment.months().reduce((report, month, index) => {
  //     const monthlyReport = Object.assign({}, categoryMap)

  //     transactions.forEach(transaction => {
  //       const date = moment(transaction.date)
  //       // console.log(transaction.category)
  //       const category = categories.find(c => c._id === transaction.category)
  //       if (date.get('month') === index) {
  //         monthlyReport[category.name] += transaction.amount
  //       }
  //     });

  //     report[month] = monthlyReport

  //     return report
  //   }, {})

  //   return report
  // }
}
