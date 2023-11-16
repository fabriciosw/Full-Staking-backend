import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReadPostInput } from '../../../schemas/post.schema';
import ApiError from '../../../utils/apiError.utils';
import IController from '../../IController';
import ReadPostByIdPostsUseCase from './readPostByIdPostsUseCase';

export default class ReadPostByIdController implements IController {
  constructor(private useCase: ReadPostByIdPostsUseCase) {}

  public async handle(
    request: Request<ReadPostInput['params']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { params } = request;

      const post = await this.useCase.execute(params.postId);

      return response.status(StatusCodes.OK).json(post);
    } catch (error: any) {
      if (error instanceof ApiError) return next(error);

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `ReadPostByIdController: ${error.message}`
      );
    }
  }
}
