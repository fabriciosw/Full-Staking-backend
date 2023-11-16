import PostCategoryRepository from '../../../database/repositories/implementations/postCategory.repository';
import CreatePostCategoryController from './createPostCategoryController';
import CreatePostCategoryUseCase from './createPostCategoryUseCase';

const postCategoryRepository = new PostCategoryRepository();

const useCase = new CreatePostCategoryUseCase(postCategoryRepository);

const controller = new CreatePostCategoryController(useCase);

export default controller;
