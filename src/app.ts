import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import config, { environments } from './config/config';
import deserializeUser from './middlewares/deserializeUser';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(deserializeUser);

if (config.env !== environments.PRODUCTION) {
  app.use(morgan('tiny'));
}

export default app;
