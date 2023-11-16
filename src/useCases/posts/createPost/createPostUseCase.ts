import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../utils/apiError.utils';
import { IPostRepository } from '../../../database/repositories/interfaces/PostRepository';
import { IPostCategoryRepository } from '../../../database/repositories/interfaces/PostCategoryRepository';
import ICreatePostRequestDTO from './ICreatePostRequestDTO';

export default class CreatePostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private postCategoryRepository: IPostCategoryRepository
  ) {}

  private async validateFields(
    postCategoryRepository: IPostCategoryRepository,
    id: string
  ) {
    const category = await postCategoryRepository.findById(id);

    if (!category)
      throw new ApiError(StatusCodes.NOT_FOUND, 'CATEGORY_ID_DOES_NOT_EXIST');
  }

  public async execute(data: ICreatePostRequestDTO) {
    const { categoryId, content, title, userId } = data;

    await this.validateFields(this.postCategoryRepository, categoryId);

    const post = await this.postRepository.create({
      authorId: userId,
      categoryId,
      content,
      title,
    });

    await this.postRepository.save(post);

    const DTO = {
      id: post.id,
      createdAt: post.createdAt,
    };

    return DTO;
  }
}
