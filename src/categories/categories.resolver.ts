import {
  InputType,
  Field,
  Resolver,
  Mutation,
  Args,
  Query,
} from '@nestjs/graphql';
import { Length } from 'class-validator';
import { Category } from '../categories/categories.model';
import { CategoriesService } from '../categories/categories.service';

@InputType()
export class CategoriesInput implements Partial<Category> {
  @Field()
  @Length(1, 255)
  name: string;
}

@Resolver()
export class CategoriesResolver {
  constructor(private categoryApi: CategoriesService) { }
  @Query(_returns => Category, { nullable: false })
  async getCategory(@Args('id') id: string) {
    return await this.categoryApi.findById(id);
  }

  @Query(() => [Category])
  async getCategories(@Args('name', { nullable: true }) name: string) {
    return await this.categoryApi.find({ name });
  }

  @Mutation(() => Category)
  async createCategory(@Args('data') { name }: CategoriesInput) {
    const category = await this.categoryApi.create({ name });
    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: string) {
    await this.categoryApi.remove(id);
    return true;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('category') category: CategoriesInput,
  ) {
    return await this.categoryApi.update(id, category);
  }
}
