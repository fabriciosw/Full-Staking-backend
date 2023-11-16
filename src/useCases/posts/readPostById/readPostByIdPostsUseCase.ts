import { StatusCodes } from 'http-status-codes';
import IUseCase from '../../IUseCase';
import { IPostRepository } from '../../../database/repositories/interfaces/PostRepository';
import ApiError from '../../../utils/apiError.utils';

export default class ReadPostByIdUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post)
      throw new ApiError(StatusCodes.NOT_FOUND, 'POST_ID_DOES_NOT_EXIST');

    return post;
  }
}
