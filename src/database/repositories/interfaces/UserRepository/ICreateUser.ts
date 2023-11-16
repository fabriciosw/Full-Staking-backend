import IUser from '../../../../models/user.model';

export interface ICreateUser
  extends Pick<IUser, 'name' | 'email' | 'password' | 'permission'> {}
