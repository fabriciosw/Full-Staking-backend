import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   error:
 *     UNAUTHORIZED:
 *        properties:
 *            status:
 *              type: number
 *              example: 401
 *            message:
 *              type: string
 *              example: NOT_LOGGED
 *     FORBIDDEN:
 *        properties:
 *            status:
 *              type: number
 *              example: 403
 *            message:
 *              type: string
 *              example: JWT_EXPIRED
 *     FORBIDDEN_ADM:
 *        properties:
 *            status:
 *              type: number
 *              example: 403
 *            message:
 *              type: string
 *              example: JWT_EXPIRED / USER_IS_NOT_ADM
 *     DuplicatedEmail:
 *        properties:
 *            status:
 *              type: number
 *              example: 409
 *            message:
 *              type: string
 *              example: EMAIL_ALREADY_REGISTERED
 *   schemas:
 *     createUser:
 *       type: object
 *       required:
 *        - name
 *        - email
 *        - password
 *       properties:
 *         name:
 *           type: string
 *           example: "Fabricio"
 *         email:
 *           type: string
 *           example: "fabricio.seb1@gmail.com"
 *         password:
 *           type: string
 *           example: "12345"
 */

const create = {
  body: object({
    name: string()
      .defined('name is required')
      .max(120, 'name must have maximum 120 characters'),
    email: string()
      .defined('email is required')
      .matches(/\S+@\S+\.\S+/, 'email format is invalid'),
    password: string().defined('password is required'),
  }).defined(),
};

const update = {
  body: object({
    name: string()
      .defined('name is required')
      .max(120, 'name must have maximum 120 characters'),
  }).defined(),
};

const params = {
  params: object({ userId: string().defined('userId is required') }),
};

export const createUserSchema = object({
  ...create,
});

export const updateUserSchema = object({
  ...update,
  ...params,
});

// export const deleteUserSchema = object({
//   ...params,
// });

export type CreateUserInput = InferType<typeof createUserSchema>;
export type UpdateUserInput = InferType<typeof updateUserSchema>;
// export type DeleteUserInput = InferType<typeof deleteUserSchema>;
