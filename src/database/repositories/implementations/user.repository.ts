import { EntityRepository, getRepository } from 'typeorm';
import User from '../../entities/User.Entity';
import { ICreateUser, IUserRepository } from '../interfaces/UserRepository';

@EntityRepository(User)
export default class UserRepository implements IUserRepository {
  async create({
    name,
    email,
    password,
    permission,
  }: ICreateUser): Promise<User> {
    const user = getRepository(User).create({
      name,
      email,
      password,
      permission,
    });

    return user;
  }

  async save(user: User): Promise<User> {
    await getRepository(User).save(user);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await getRepository(User).findOne({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await getRepository(User).findOne({ where: { email } });

    return user;
  }
}
