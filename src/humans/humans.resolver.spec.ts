import { Test, TestingModule } from '@nestjs/testing';
import { HumansResolver } from './humans.resolver';

describe('HumansResolver', () => {
  let resolver: HumansResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HumansResolver],
    }).compile();

    resolver = module.get<HumansResolver>(HumansResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
