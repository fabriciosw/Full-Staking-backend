import logger from './config/logger';
import database from './config/database';
import swaggerDocs from './config/swagger';
import config, { environments } from './config/config';
import app from './app';

console.log('antes do listen');
app.listen(config.port, async () => {
  try {
    logger.info(`API rodando em http://${config.publicUrl}:${config.port}`);

    await database();

    if (config.env !== environments.PRODUCTION) {
      swaggerDocs(app, config.publicUrl, config.port);
    }
  } catch (e) {
    console.log(`ERRO listen: ${e}`);
  }
});
