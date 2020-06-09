import {
  Resolver,
  Query,
  Args,
  Field,
  InputType,
  Mutation,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDTO } from './accounts.dto';
import { Account, AccountTypes } from './accounts.model';
import { buildSearchQuery } from "../query";
// import { TransactionModel } from '../transactions/transaction.model';
@InputType()
export class GetAccountsRequest {
  @Field(() => String, { nullable: true })
  _id?: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  accountName?: string;
  @Field(() => Boolean, { nullable: true })
  active?: boolean;
  @Field(() => String, { nullable: true })
  currency?: string;
  @Field(() => String, { nullable: true })
  type?: AccountTypes;
}

@InputType()
export class AccountInput {
  @Field({ nullable: true })
  _id: string;
  @Field({ nullable: false })
  name: string;
  @Field({ nullable: false })
  accountName: string;
  @Field({ nullable: true })
  active: boolean;
}

@Resolver(of => Account)
export class AccountsResolver {
  constructor(
    @InjectModel('Account') private model: Model<AccountDTO>
  ) { }

  @Query(returns => [Account])
  async getAccounts(@Args('query', { nullable: true }) query: GetAccountsRequest) {
    const args = buildSearchQuery(['name'], query)
    return await this.model.find(args)
  }

  @Mutation(() => Account, { nullable: false })
  async createAccount(@Args('account') account: AccountInput) {
    return await this.model.create(account);
  }

  // @ResolveField()
  // async transactions(@Parent() account: Account) {
  //   const transactions = await TransactionModel.find({ account: account._id });
  //   return transactions;
  // }
}
