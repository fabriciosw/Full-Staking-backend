import { Router } from 'express';
import validateResource from '../../middlewares/validateResource';
import { createSessionSchema } from '../../schemas/session.schema';
import createSessionHandler from '../../useCases/sessions/createSession';

const routes = Router();

/**
 * @openapi
 *
 * '/api/v1/sessions':
 *  post:
 *     tags:
 *     - Sessions
 *     summary: Create a new session
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createSession'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             message: LOGGED_IN
 *             token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiYWRtaW4iLCJpYXQiOjE2NjQ5MTAwNjAsImV4cCI6MTY2NDkzMTY2MCwic3ViIjoiYmFhMjM1YTctOTNjNi00ZjFjLThmMDktODYyZjRjMDcxN2IzIn0.6ULHiXIBAmz43CRTlFHaZxxp88Z7OQ-k-L0f7iR2swo
 *       401:
 *         description: UNAUTHORIZED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                  type: string
 *                  example: INVALID_CREDENTIALS
 *       400:
 *         description: BAD REQUEST
 *         content:
 *           application/json:
 *             schema:
 *               example: [
 *                "email is required",
 *                "password is required",
 *                'email format is invalid',
 *               ]
 */

routes
  .route('/')
  .post(validateResource(createSessionSchema), (req, res, next) =>
    createSessionHandler.handle(req, res, next)
  );

export default routes;
