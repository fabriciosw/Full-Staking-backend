import PostRepository from '../../../database/repositories/implementations/post.repository';
import PostCategoryRepository from '../../../database/repositories/implementations/postCategory.repository';
import CreatePostController from './createPostController';
import CreatePostUseCase from './createPostUseCase';

const postRepository = new PostRepository();
const postCategoryRepository = new PostCategoryRepository();

const useCase = new CreatePostUseCase(postRepository, postCategoryRepository);

const controller = new CreatePostController(useCase);

export default controller;
