import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import config, { environments } from './config/config';
import routes from './routes';
import deserializeUser from './middlewares/deserializeUser';
import ApiError from './utils/apiError.utils';

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

routes(app);

app.use(
  (
    error: unknown,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (error instanceof ApiError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
);

export default app;
