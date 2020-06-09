import { Module } from '@nestjs/common';
import { ExpensesResolver } from './expenses.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModel } from './expense.model';
import { CategoriesModule } from 'src/categories/categories.module';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    AccountsModule,
    CategoriesModule,
    MongooseModule.forFeature([
      { name: 'Expense', schema: ExpenseModel.schema }
    ])
  ],
  providers: [ExpensesResolver]
})
export class ExpensesModule { }
