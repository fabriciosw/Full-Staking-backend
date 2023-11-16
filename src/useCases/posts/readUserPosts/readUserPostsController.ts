import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../utils/apiError.utils';
import IController from '../../IController';
import IReadUserPostsRequestDTO from './IReadUserPostsRequestDTO';
import ReadUserPostsUseCase from './readUserPostsUseCase';

export default class ReadUserPostsController implements IController {
  constructor(private useCase: ReadUserPostsUseCase) {}

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = response.locals.user.decoded.sub;

      const useCaseData: IReadUserPostsRequestDTO = {
        userId,
      };

      const posts = await this.useCase.execute(useCaseData);

      return response.status(StatusCodes.OK).json(posts);
    } catch (error: any) {
      if (error instanceof ApiError) return next(error);

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `ReadUserPostsController: ${error.message}`
      );
    }
  }
}
