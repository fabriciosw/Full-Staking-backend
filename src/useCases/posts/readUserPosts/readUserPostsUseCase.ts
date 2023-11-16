import IUseCase from '../../IUseCase';
import { IPostRepository } from '../../../database/repositories/interfaces/PostRepository';
import IReadUserPostsRequestDTO from './IReadUserPostsRequestDTO';

export default class ReadUserPostsUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute(data: IReadUserPostsRequestDTO) {
    const posts = await this.postRepository.findByAuthorId(data.userId);

    return posts;
  }
}
