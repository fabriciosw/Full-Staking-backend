import PostRepository from '../../../database/repositories/implementations/post.repository';
import ReadAllPostsController from './readAllPostsController';
import ReadAllPostsUseCase from './readAllPostsUseCase';

const postRepository = new PostRepository();

const useCase = new ReadAllPostsUseCase(postRepository);

const controller = new ReadAllPostsController(useCase);

export default controller;
