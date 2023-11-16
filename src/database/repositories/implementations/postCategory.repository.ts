import { EntityRepository, getRepository } from 'typeorm';
import PostCategory from '../../entities/PostCategory.Entity';
import {
  ICreatePostCategory,
  IPostCategoryRepository,
} from '../interfaces/PostCategoryRepository';

@EntityRepository(PostCategory)
export default class PostCategoryRepository implements IPostCategoryRepository {
  async create({ name }: ICreatePostCategory): Promise<PostCategory> {
    const postCategory = await getRepository(PostCategory).create({ name });

    return postCategory;
  }

  async save(postCategory: PostCategory): Promise<PostCategory> {
    const newPostCategory = await getRepository(PostCategory).save(
      postCategory
    );

    return newPostCategory;
  }

  async readAll(): Promise<PostCategory[]> {
    const postCategories = await getRepository(PostCategory).find();

    return postCategories;
  }

  async findById(id: string): Promise<PostCategory | undefined> {
    const postCategory = await getRepository(PostCategory).findOne({
      where: { id },
    });

    return postCategory;
  }

  async findByName(name: string): Promise<PostCategory | undefined> {
    const postCategory = await getRepository(PostCategory).findOne({
      where: { name },
    });

    return postCategory;
  }
}
