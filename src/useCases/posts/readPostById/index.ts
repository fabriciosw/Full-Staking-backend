import PostRepository from '../../../database/repositories/implementations/post.repository';
import ReadPostByIdController from './readPostByIdController';
import ReadPostByIdPostsUseCase from './readPostByIdPostsUseCase';

const postRepository = new PostRepository();

const useCase = new ReadPostByIdPostsUseCase(postRepository);

const controller = new ReadPostByIdController(useCase);

export default controller;
