import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { buildRegExpQuery } from '../query';
import { TransactionDTO } from './dto/transaction.dto';
import { AccountDTO } from '../accounts/accounts.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private transactionModel: Model<TransactionDTO>,
    @InjectModel('Account') private accountModel: Model<AccountDTO>,
    private categoryService: CategoriesService,
  ) { }

  /**
   * Construct list of category ids matching given name
   * @param name Name of category to search for
   */
  async getAccountIds(name: string): Promise<{ $in: string[] }> {
    const accounts = await this.accountModel.find({ name: new RegExp(name, 'ig') }).exec()

    return {
      $in: accounts.map(c => c._id)
    }
  }

  async find(args?): Promise<any> {
    let records: any;

    if (args && Object.keys(args).length > 0) {
      const query: { [field: string]: any } = { ...args };

      if (args.payee) query.payee = buildRegExpQuery(args.payee);

      if (args.before || args.after) {
        query.date = {};
        if (args.before) query.date.$lt = new Date(args.before);
        if (args.after) query.date.$gt = new Date(args.after);
      }

      if (args.category) {
        query.category = await this.categoryService.getCategoryIds(args.category);
      }

      if (args.account) {
        query.account = await this.getAccountIds(args.account)
      }

      records = await this.transactionModel
        .find(query)
        .populate('category')
        .populate('account')
        .exec();
    } else {
      records = await this.transactionModel
        .find({})
        .limit(50)
        .populate('category')
        .populate('account')
        .exec();
    }

    return records;
  }

  async findOne(_id: string) {
    return await this.transactionModel.findOne({ _id });
  }

  async save(transaction) {
    return await this.transactionModel.create(transaction);
  }

  async update({ _id, ...transaction }): Promise<boolean | { err: string }> {
    try {
      const result = await this.transactionModel.updateOne({ _id }, transaction);
      return result.nModified !== 0;
    } catch (err) {
      return { err };
    }
  }

  async delete(id: string): Promise<boolean | { err: string }> {
    try {
      const result = await this.transactionModel.deleteOne({ _id: id });
      console.log(result)
      return true;
    } catch (err) {
      return { err };
    }
  }
}
