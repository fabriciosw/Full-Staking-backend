import PostCategoryRepository from '../../../database/repositories/implementations/postCategory.repository';
import ReadAllPostCategoryController from './readAllPostCategoriesController';
import CreatePostCategoryUseCase from './readAllPostCategoriesUseCase';

const postCategoryRepository = new PostCategoryRepository();

const useCase = new CreatePostCategoryUseCase(postCategoryRepository);

const controller = new ReadAllPostCategoryController(useCase);

export default controller;
