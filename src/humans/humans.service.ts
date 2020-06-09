import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { HumanDTO } from './human.interface'

@Injectable()
export class HumansService {
  constructor(
    @InjectModel('Human') private human: Model<HumanDTO>
  ) { }

  async currentUser() {
    return this.human.findOne({})
  }
}
