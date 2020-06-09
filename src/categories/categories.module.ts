import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { CategoryModel } from './categories.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategoryModel.schema },
    ]),
  ],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule { }
