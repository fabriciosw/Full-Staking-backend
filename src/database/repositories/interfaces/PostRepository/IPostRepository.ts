import { ICreate, IFindByAuthorId, IFindById, IReadAll } from '.';
import Post from '../../../entities/Post.Entity';

export interface IPostRepository {
  create(post: ICreate): Promise<Post>;
  save(post: Post): Promise<Post>;
  findByAuthorId(id: string): Promise<IFindByAuthorId>;
  findById(id: string): Promise<IFindById | undefined>;
  readAll(): Promise<IReadAll>;
}
