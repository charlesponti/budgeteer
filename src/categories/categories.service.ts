import { Injectable } from '@nestjs/common';
import { Types, Model } from 'mongoose';

import { buildSearchQuery } from '../query';
import { Category } from './categories.interface';
import { CategoriesInput } from './categories.resolver';
import { InjectModel } from '@nestjs/mongoose';

interface GetCategoriesRequest {
  id?: string;
  name?: string;
}

interface CreateCategoryRequest {
  name: string;
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private model: Model<Category>,
  ) { }

  async findById(id: string) {
    const category = await this.model.findById(Types.ObjectId(id));
    if (category) return category;
    throw new Error(
      `Category with ID ${id} could not be fetched.   ` + 'CAN_NOT_FETCH_BY_ID',
    );
  }

  async find(args?: GetCategoriesRequest) {
    if (args && Object.keys(args).length > 0) {
      const query = buildSearchQuery(['name'], args);
      return await this.model.find(query).sort({ name: 1 });
    }

    return await this.model.find();
  }

  async create(category: CreateCategoryRequest) {
    return await this.model.create(category);
  }

  async update(id: string, category: CategoriesInput) {
    return await this.model.update({ _id: id }, category);
  }

  async remove(id: string) {
    return await this.model.deleteOne({ _id: id });
  }

  /**
   * Construct list of category ids matching given name
   * @param name Name of category to search for
   */
  async getCategoryIds(name: string): Promise<{ $in: string[] }> {
    return {
      $in: (await this.model.find({ name: new RegExp(name, 'ig') }).exec()).map(c => c._id)
    }
  }
}
