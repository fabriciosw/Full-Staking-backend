import { ICreatePostCategory } from '.';
import PostCategory from '../../../entities/PostCategory.Entity';

export interface IPostCategoryRepository {
  create(postCategory: ICreatePostCategory): Promise<PostCategory>;
  save(postCategory: PostCategory): Promise<PostCategory>;
  findById(id: string): Promise<PostCategory | undefined>;
  findByName(name: string): Promise<PostCategory | undefined>;
  readAll(): Promise<PostCategory[]>;
}
