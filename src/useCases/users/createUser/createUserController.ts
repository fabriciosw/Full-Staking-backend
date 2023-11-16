import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserInput } from '../../../schemas/user.schema';
import ApiError from '../../../utils/apiError.utils';
import IController from '../../IController';
import CreateUserUseCase from './createUserUseCase';

export default class CreateUserController implements IController {
  constructor(private useCase: CreateUserUseCase) {}

  public async handle(
    request: Request<{}, {}, CreateUserInput['body']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { body } = request;
      const user = await this.useCase.execute(body);

      return response
        .status(StatusCodes.CREATED)
        .json({ message: 'User created', user });
    } catch (error: any) {
      if (error instanceof ApiError) return next(error);

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `CreateUserController: ${error.message}`
      );
    }
  }
}
