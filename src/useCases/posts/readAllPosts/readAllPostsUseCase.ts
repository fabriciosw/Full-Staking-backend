import IUseCase from '../../IUseCase';
import { IPostRepository } from '../../../database/repositories/interfaces/PostRepository';

export default class ReadAllPostsUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute() {
    const posts = await this.postRepository.readAll();

    return posts;
  }
}
