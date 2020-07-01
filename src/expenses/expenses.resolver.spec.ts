import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesResolver } from './expenses.resolver';
import { AccountsModule } from '../accounts/accounts.module';
import { CategoriesModule } from '../categories/categories.module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('ExpensesResolver', () => {
  let resolver: ExpensesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule, CategoriesModule,
        MongooseModule.forRoot('mongodb://localhost:27017/test', { useNewUrlParser: true  }),
      ],
      providers: [
        ExpensesResolver,
        {
          provide: 'ExpenseModel',
          useValue: {}
        }
      ],
    }).compile();

    resolver = module.get<ExpensesResolver>(ExpensesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
