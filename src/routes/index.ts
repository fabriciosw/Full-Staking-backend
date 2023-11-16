import { Express, Request, Response } from 'express';
import userRoutes from './v1/user.routes';
import postCategoryRoutes from './v1/postCategory.routes';
import postRoutes from './v1/post.routes';
import sessionRoutes from './v1/session.routes';

function routes(app: Express) {
  /**
   * @openapi
   * /api/healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/api/healthcheck', (req: Request, res: Response) =>
    res.status(200).json({
      message: 'Hello World',
    })
  );

  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/postCategories', postCategoryRoutes);
  app.use('/api/v1/posts', postRoutes);
  app.use('/api/v1/sessions', sessionRoutes);
}

export default routes;
