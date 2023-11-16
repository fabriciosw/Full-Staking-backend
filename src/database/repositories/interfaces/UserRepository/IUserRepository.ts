import User from '../../../entities/User.Entity';
import { ICreateUser } from '.';

export interface IUserRepository {
  create(user: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
