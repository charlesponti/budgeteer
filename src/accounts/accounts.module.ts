import { Module, forwardRef } from '@nestjs/common';
import { AccountsResolver } from './accounts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModel } from './accounts.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Account', schema: AccountModel.schema }
    ])
  ],
  providers: [AccountsResolver],
  exports: [MongooseModule]
})
export class AccountsModule { }
