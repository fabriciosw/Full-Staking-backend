import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateSessionInput } from '../../../schemas/session.schema';
import ApiError from '../../../utils/apiError.utils';
import IController from '../../IController';
import CreateSessionUseCase from './createSessionUseCase';

export default class CreateSessionController implements IController {
  constructor(private useCase: CreateSessionUseCase) {}

  public async handle(
    request: Request<{}, {}, CreateSessionInput['body']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { body } = request;
      const token = await this.useCase.execute(body);

      return response
        .status(StatusCodes.CREATED)
        .json({ message: 'LOGGED_IN', token });
    } catch (error: any) {
      if (error instanceof ApiError) return next(error);

      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `CreateSessionController: ${error.message}`
      );
    }
  }
}
