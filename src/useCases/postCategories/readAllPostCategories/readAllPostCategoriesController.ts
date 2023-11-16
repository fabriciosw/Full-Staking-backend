import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../utils/apiError.utils';
import IController from '../../IController';
import readAllPostCategoriesUseCase from './readAllPostCategoriesUseCase';

export default class ReadAllPostCategoryController implements IController {
  constructor(private useCase: readAllPostCategoriesUseCase) {}

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const postCategory = await this.useCase.execute();

      return response.status(StatusCodes.OK).json(postCategory);
    } catch (error: any) {
      if (error instanceof ApiError) return next(error);

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `ReadAllPostCategoryController: ${error.message}`
      );
    }
  }
}
