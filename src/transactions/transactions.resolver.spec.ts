import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { TransactionsResolver } from './transactions.resolver';
import { TransactionService } from './transactions.service';
import { HumansService } from '../humans/humans.service';
import { CategoriesService } from '../categories/categories.service';

describe('TransactionsResolver', () => {
  let resolver: TransactionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test', { useNewUrlParser: true  })
      ],
      providers: [
        TransactionsResolver, 
        TransactionService,
        CategoriesService,
        HumansService,
        { provide: 'TransactionModel', useValue: {} },
        { provide: 'AccountModel', useValue: {} },
        { provide: 'CategoryModel', useValue: {} },
        { provide: 'HumanModel', useValue: {} }
      ],
    }).compile();

    resolver = module.get<TransactionsResolver>(TransactionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
