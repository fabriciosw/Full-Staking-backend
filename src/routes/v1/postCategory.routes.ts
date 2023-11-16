import { NextFunction, Request, Response, Router } from 'express';
import requireAdmin from '../../middlewares/requireAdmin';
import validateResource from '../../middlewares/validateResource';
import { createPostCategorySchema } from '../../schemas/postCategory.schema';
import createPostCategoryHandler from '../../useCases/postCategories/createPostCategory';
import readAllPostCategories from '../../useCases/postCategories/readAllPostCategories';

const routes = Router();

/**
 * @openapi
 * '/api/v1/postCategories':
 *  get:
 *     tags:
 *     - Post categories
 *     summary: Get all post categories
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/getAllPostCategories'
 *  post:
 *     tags:
 *     - Post categories
 *     summary: Create a new post category
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createPostCategory'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             message: Post category created
 *             postCategory:
 *              id: 7e63add2-5f09-4efc-b28d-74fb07f3e14e
 *              name: Entretenimento
 *              createdAt: 2022-09-28T21:17:49.205Z
 *       401:
 *         description: UNAUTHORIZED
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/UNAUTHORIZED'
 *       403:
 *         description: FORBIDDEN
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/FORBIDDEN_ADM'
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               example: [
 *                "name is required",
 *                'name must have maximum 50 characters'
 *               ]
 *       409:
 *         description: There's already an category with that name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/DuplicatedPostCategoryName'
 */

routes
  .route('/')
  .post(
    [validateResource(createPostCategorySchema), requireAdmin],
    (req: Request, res: Response, next: NextFunction) =>
      createPostCategoryHandler.handle(req, res, next)
  )
  .get((req, res, next) => readAllPostCategories.handle(req, res, next));

export default routes;
