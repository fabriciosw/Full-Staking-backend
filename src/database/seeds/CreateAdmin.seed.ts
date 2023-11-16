import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../entities/User.Entity';
import config from '../../config/config';
import UserPermission from '../entities/enums/UserPermission';

export default class CreateAdmin implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(User).count();
    if (rows <= 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'Fabricio el ADM',
            email: 'fabricio.seb1@gmail.com',
            password: await bcrypt.hash('12345', config.saltWorkFactor),
            permission: UserPermission.ADMIN,
          },
        ])
        .execute();
    }
  }
}
