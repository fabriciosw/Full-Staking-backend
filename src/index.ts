import { NextFunction, Request, Response } from 'express';
import logger from './config/logger';
import database from './config/database';
import swaggerDocs from './config/swagger';
import config, { environments } from './config/config';
import routes from './routes';
import ApiError from './utils/apiError.utils';
import app from './app';

console.log('antes do listen');
app.listen(config.port, async () => {
  try {
    logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

    await database();

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

    if (config.env !== environments.PRODUCTION) {
      swaggerDocs(app, config.publicUrl, config.port);
    }
  } catch (e) {
    console.log(`ERRO listen: ${e}`);
  }
});
