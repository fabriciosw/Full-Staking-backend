import { EntityRepository, getRepository } from 'typeorm';
import Post from '../../entities/Post.Entity';
import {
  ICreate,
  IFindByAuthorId,
  IFindById,
  IPostRepository,
  IReadAll,
} from '../interfaces/PostRepository';

@EntityRepository(Post)
export default class PostRepository implements IPostRepository {
  async create({
    authorId,
    categoryId,
    content,
    title,
  }: ICreate): Promise<Post> {
    const post = await getRepository(Post).create({
      author: { id: authorId },
      category: { id: categoryId },
      content,
      title,
    });

    return post;
  }

  async save(post: Post): Promise<Post> {
    const newPost = await getRepository(Post).save(post);

    return newPost;
  }

  async readAll(): Promise<IReadAll> {
    const posts = await getRepository(Post)
      .createQueryBuilder('posts')
      .innerJoinAndSelect('posts.author', 'author')
      .innerJoinAndSelect('posts.category', 'category')
      .select([
        'posts.id',
        'posts.title',
        'posts.createdAt',
        'author.name',
        'category.name',
      ])
      .getMany();

    return posts as unknown as IReadAll;
  }

  async findByAuthorId(author: string): Promise<IFindByAuthorId> {
    const posts = await getRepository(Post)
      .createQueryBuilder('posts')
      .where({ author })
      .innerJoinAndSelect('posts.category', 'category')
      .select([
        'posts.id',
        'posts.title',
        'posts.createdAt',
        'posts.content',
        'category.name',
      ])
      .getMany();

    return posts as unknown as IFindByAuthorId;
  }

  async findById(id: string): Promise<IFindById | undefined> {
    const post = await getRepository(Post)
      .createQueryBuilder('posts')
      .where({ id })
      .innerJoinAndSelect('posts.author', 'author')
      .innerJoinAndSelect('posts.category', 'category')
      .select([
        'posts.id',
        'posts.title',
        'posts.content',
        'posts.createdAt',
        'author.name',
        'category.name',
      ])
      .getOne();

    return post as unknown as IFindById;
  }
}
