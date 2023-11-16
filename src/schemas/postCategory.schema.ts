import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   error:
 *     DuplicatedPostCategoryName:
 *        properties:
 *            status:
 *              type: number
 *              example: 409
 *            message:
 *              type: string
 *              example: CATEGORY_NAME_ALREADY_REGISTERED
 *   schemas:
 *     createPostCategory:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              example: Entretenimento
 *     getAllPostCategories:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            example: bbe6fa3f-b11b-4b89-87e6-bb54511b8890
 *          name:
 *            type: string
 *            example: Fabricio
 *          createdAt:
 *            type: string
 *            example: 2022-09-30T16:07:11.218Z
 *          updatedAt:
 *            type: string
 *            example: 2022-09-30T16:07:11.218Z
 */

const create = {
  body: object({
    name: string()
      .defined('name is required')
      .max(50, 'name must have maximum 50 characters'),
  }).defined(),
};

const update = {
  body: object({
    name: string()
      .defined('name is required')
      .max(50, 'name must have maximum 50 characters'),
  }).defined(),
};

const params = {
  params: object({
    postCategoryId: string().defined('postCategoryId is required'),
  }),
};

export const createPostCategorySchema = object({
  ...create,
});

export const updatePostCategorySchema = object({
  ...update,
  ...params,
});

export const deletePostCategorySchema = object({
  ...params,
});

export type CreatePostCategoryInput = InferType<
  typeof createPostCategorySchema
>;
export type UpdatePostCategoryInput = InferType<
  typeof updatePostCategorySchema
>;
export type DeletePostCategoryInput = InferType<
  typeof deletePostCategorySchema
>;
