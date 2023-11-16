import UserPermission from '../database/entities/enums/UserPermission';
import IBase from './base.model';

export default interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
  permission: UserPermission;
}
