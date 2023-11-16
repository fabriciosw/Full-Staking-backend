import { StatusCodes } from 'http-status-codes';
import { compare } from 'bcrypt';
import { CreateSessionInput } from '../../../schemas/session.schema';
import ApiError from '../../../utils/apiError.utils';
import IUseCase from '../../IUseCase';
import config from '../../../config/config';
import { signJwt } from '../../../utils/jwt.utils';
import { IUserRepository } from '../../../database/repositories/interfaces/UserRepository';

export default class CreateSessionUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(body: CreateSessionInput['body']) {
    const { email, password } = body;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'INVALID_CREDENTIALS');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'INVALID_CREDENTIALS');
    }

    const token = signJwt(
      { auth: `${user.permission}` },
      {
        subject: `${user.id}`,
        expiresIn: config.accessTokenTtl,
      }
    );

    return token;
  }
}
