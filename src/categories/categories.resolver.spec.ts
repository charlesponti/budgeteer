import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { CategoriesModule } from './categories.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('CategoriesResolver', () => {
  let resolver: CategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CategoriesModule,
        MongooseModule.forRoot('mongodb://localhost:27017/test', { useNewUrlParser: true  }),
      ],
      providers: [
        CategoriesResolver,
        {
          provide: 'CategoryModel',
          useValue: {}
        }
      ],
    }).compile();

    resolver = module.get<CategoriesResolver>(CategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
