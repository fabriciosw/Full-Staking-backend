import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreatePostInput } from '../../../schemas/post.schema';
import ApiError from '../../../utils/apiError.utils';
import IController from '../../IController';
import createPostUseCase from './createPostUseCase';
import ICreatePostRequestDTO from './ICreatePostRequestDTO';

export default class CreatePostController implements IController {
  constructor(private useCase: createPostUseCase) {}

  public async handle(
    request: Request<{}, {}, CreatePostInput['body']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { body } = request;
      const userId = response.locals.user.decoded.sub;

      const useCaseData: ICreatePostRequestDTO = {
        ...body,
        userId,
      };

      const post = await this.useCase.execute(useCaseData);

      return response
        .status(StatusCodes.CREATED)
        .json({ message: 'Post created', post });
    } catch (error: any) {
      if (error instanceof ApiError) return next(error);

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `CreatePostController: ${error.message}`
      );
    }
  }
}
