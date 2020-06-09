import { Module } from '@nestjs/common';
import { HumansResolver } from './humans.resolver';
import { HumansService } from './humans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HumanSchema } from './humans.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Human', schema: HumanSchema }
    ])
  ],
  providers: [HumansResolver, HumansService],
  exports: [HumansService]
})
export class HumansModule { }
