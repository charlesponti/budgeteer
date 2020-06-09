import { Resolver, Query } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HumanDTO } from './human.interface';
import { Human } from './humans.model';

@Resolver('Humans')
export class HumansResolver {
  constructor(
    @InjectModel("Human") private model: Model<HumanDTO>
  ) { }

  @Query(returns => [Human])
  async getHumans() {
    return await this.model.find()
  }

}
