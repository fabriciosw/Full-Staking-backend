import { Router } from 'express';
import validateResource from '../../middlewares/validateResource';
import { createUserSchema } from '../../schemas/user.schema';
import createUserHandler from '../../useCases/users/createUser';

const routes = Router();

/**
 * @openapi
 *
 * '/api/v1/users':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUser'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             message: User created
 *             user:
 *              id: b0a67f4b-091a-452e-bf59-9e16f18cff5e
 *              name: Fabricio
 *              email: fabricio.seb1@gmail.com
 *              createdAt: 2022-09-28T21:17:49.205Z
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               example: [
 *                "name is required",
 *                "email is required",
 *                "password is required",
 *                'name must have maximum 120 characters',
 *                'email format is invalid',
 *               ]
 *       409:
 *         description: There's already an user with that Email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/DuplicatedEmail'
 */

routes
  .route('/')
  .post(validateResource(createUserSchema), (req, res, next) =>
    createUserHandler.handle(req, res, next)
  );

export default routes;
