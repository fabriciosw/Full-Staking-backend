import { createConnection, getConnection, ConnectionOptions } from 'typeorm';
import bcrypt from 'bcrypt';
import projectConfig from '../src/config/config';
import User from '../src/database/entities/User.Entity';
import UserPermission from '../src/database/entities/enums/UserPermission';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: projectConfig.postgresDb.host,
  port: projectConfig.postgresDb.testsPort,
  username: projectConfig.postgresDb.username,
  password: projectConfig.postgresDb.password,
  database: projectConfig.postgresDb.database,
  dropSchema: true,
  logging: false,
  synchronize: false,
  migrationsRun: true,
  entities: ['./src/database/entities/*{.js,.ts}'],
  migrations: ['./src/database/migrations/*{.js,.ts}'],
  cli: {
    entitiesDir: './src/database/entities',
    migrationsDir: './src/database/migrations',
  },
};

const connection = {
  async create() {
    const testConnection = await createConnection(ormConfig);

    await testConnection.getRepository(User).save({
      name: 'Fabricio',
      email: 'fabricio.seb1@gmail.com',
      password: await bcrypt.hash('12345', projectConfig.saltWorkFactor),
      permission: UserPermission.ADMIN,
    });
  },

  async close() {
    const testConnection = getConnection();
    const entities = testConnection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = testConnection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    await testConnection.close();
  },
};

export default connection;
