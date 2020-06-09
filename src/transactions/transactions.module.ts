import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionsResolver } from '../transactions/transactions.resolver';
import { TransactionsController } from './transactions.controller';
import { TransactionService } from './transactions.service';
import { TransactionSchema } from './transaction.model';
import { AccountsModule } from '../accounts/accounts.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { HumansModule } from 'src/humans/humans.module';

@Module({
  imports: [
    AccountsModule,
    CategoriesModule,
    HumansModule,
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsResolver, TransactionService],
})
export class TransactionModule { }
