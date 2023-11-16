import { NextFunction, Request, Response, Router } from 'express';
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';
import {
  createPostSchema,
  onlyParamsPostSchema,
} from '../../schemas/post.schema';
import createPostHandler from '../../useCases/posts/createPost';
import readAllPostsHandler from '../../useCases/posts/readAllPosts';
import readUserPostsHandler from '../../useCases/posts/readUserPosts';
import readPostByIdHandler from '../../useCases/posts/readPostById';

const routes = Router();

/**
 * @openapi
 * '/api/v1/posts':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/getAllPosts'
 *  post:
 *     tags:
 *     - Posts
 *     summary: Create a new post
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createPost'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             message: Post created
 *             post:
 *              id: 7e63add2-5f09-4efc-b28d-74fb07f3e14e
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
 *               $ref: '#/components/error/FORBIDDEN'
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               example: [
 *                "categoryId is required",
 *                'A valid categoryId has a string length of 36 characters',
 *                'title is required',
 *                'content is required'
 *               ]
 *       404:
 *         description: Category id sent does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/NonexistentCategoryId'
 * '/api/v1/posts/me':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get user posts
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/getUserPosts'
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
 *               $ref: '#/components/error/FORBIDDEN'
 * '/api/v1/posts/{postId}':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get post by id
 *     parameters:
 *      - name: postId
 *        in: path
 *        description: The post id
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/getPostById'
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               example: [
 *                "postId is required"
 *               ]
 *       404:
 *         description: Post id sent does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/NonexistentPostId'
 */

routes
  .route('/')
  .post(
    [validateResource(createPostSchema), requireUser],
    (req: Request, res: Response, next: NextFunction) =>
      createPostHandler.handle(req, res, next)
  )
  .get((req, res, next) => readAllPostsHandler.handle(req, res, next));

routes
  .route('/me')
  .get(requireUser, (req, res, next) =>
    readUserPostsHandler.handle(req, res, next)
  );

routes
  .route('/:postId')
  .get(validateResource(onlyParamsPostSchema), (req, res, next) =>
    readPostByIdHandler.handle(req, res, next)
  );

export default routes;
