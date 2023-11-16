import IUseCase from '../../IUseCase';
import { IPostCategoryRepository } from '../../../database/repositories/interfaces/PostCategoryRepository';

export default class ReadAllPostCategoriesUseCase implements IUseCase {
  constructor(private postCategoryRepository: IPostCategoryRepository) {}

  public async execute() {
    const postCategories = await this.postCategoryRepository.readAll();

    return postCategories;
  }
}
