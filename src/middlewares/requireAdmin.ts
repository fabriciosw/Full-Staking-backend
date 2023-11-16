import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/apiError.utils';

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;

  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'NOT_LOGGED');
  }

  if (user.isTokenExpired)
    throw new ApiError(StatusCodes.FORBIDDEN, 'JWT_EXPIRED');

  if (user.decoded.auth !== 'admin')
    throw new ApiError(StatusCodes.FORBIDDEN, 'USER_IS_NOT_ADM');

  return next();
};

export default requireAdmin;
