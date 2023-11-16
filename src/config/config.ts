import dotenv from 'dotenv';
import * as yup from 'yup';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const environments = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'test',
  STAGING: 'staging',
};

const environmentsString = Object.values(environments);

const envVarsSchema = yup
  .object()
  .shape({
    NODE_ENV: yup
      .string()
      .oneOf(environmentsString)
      .default(environments.DEVELOPMENT),
    API_PORT: yup.number().default(3001),
    PUBLIC_URL: yup.string().default('localhost'),
    SALT_WORK_FACTOR: yup.number().default(10),
    ACCESS_TOKEN_TTL: yup.string().default('15m'),
    REFRESH_TOKEN_TTL: yup.string().default('1y'),
    JWT_SECRET: yup.string(),
    POSTGRES_HOST: yup.string(), // .required('POSTGRES_HOST is required'),
    POSTGRES_PORT: yup.number().default(5432),
    POSTGRES_TESTS_PORT: yup.number().default(5433),
    POSTGRES_USER: yup.string(), // .required('POSTGRES_USER is required'),
    POSTGRES_PASSWORD: yup.string(), // .required('POSTGRES_PASSWORD is required'),
    POSTGRES_DATABASE: yup.string(), // .required('POSTGRES_DB is required'),
  })
  .noUnknown();

let envVars;

try {
  envVarsSchema.validateSync(process.env, { abortEarly: false });
  envVars = envVarsSchema.cast(process.env);
} catch ({ errors }) {
  throw new Error(`Config validation error: ${errors}`);
}

const config = {
  env: process.env.NODE_ENV,
  port: process.env.API_PORT,
  publicUrl: process.env.PUBLIC_URL,
  postgresDb: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    testsPort: process.env.POSTGRES_TESTS_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  saltWorkFactor: process.env.SALT_WORK_FACTOR,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  jwtSecret: process.env.JWT_SECRET,
};

console.log(config);

export default config as any;
