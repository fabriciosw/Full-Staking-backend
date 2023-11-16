import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { CreateUserInput } from '../../../schemas/user.schema';
import ApiError from '../../../utils/apiError.utils';
import UserPermission from '../../../database/entities/enums/UserPermission';
import config from '../../../config/config';
import { IUserRepository } from '../../../database/repositories/interfaces/UserRepository/IUserRepository';
import IUseCase from '../../IUseCase';

export default class CreateUserUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {}

  private async validateFields(userRepository: IUserRepository, email: string) {
    const userExists = await userRepository.findByEmail(email);

    if (userExists)
      throw new ApiError(StatusCodes.CONFLICT, 'EMAIL_ALREADY_REGISTERED');
  }

  public async execute(body: CreateUserInput['body']) {
    await this.validateFields(this.userRepository, body.email);

    const hashedPassword = await bcrypt.hash(
      body.password,
      config.saltWorkFactor
    );

    const user = await this.userRepository.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      permission: UserPermission.NONE,
    });

    await this.userRepository.save(user);

    const DTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return DTO;
  }
}
