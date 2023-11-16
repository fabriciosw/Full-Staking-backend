import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     createSession:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              example: fabricio.seb1@gmail.com
 *            password:
 *              type: string
 *              example: 12345
 */

const create = {
  body: object({
    email: string()
      .defined('email is required')
      .matches(/\S+@\S+\.\S+/, 'email format is invalid'),
    password: string().defined('password is required'),
  }).defined(),
};

export const createSessionSchema = object({
  ...create,
});

export type CreateSessionInput = InferType<typeof createSessionSchema>;
