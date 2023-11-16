import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   error:
 *     NonexistentCategoryId:
 *        properties:
 *            status:
 *              type: number
 *              example: 404
 *            message:
 *              type: string
 *              example: CATEGORY_ID_DOES_NOT_EXIST
 *     NonexistentPostId:
 *        properties:
 *            status:
 *              type: number
 *              example: 404
 *            message:
 *              type: string
 *              example: POST_ID_DOES_NOT_EXIST
 *   schemas:
 *     createPost:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              example: Saiba mais sobre o clean code
 *            categoryId:
 *              type: string
 *              example: 169d28a2-5e3d-407e-ac39-7541812c9f88
 *            content:
 *              type: string
 *              example: string
 *     getAllPosts:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            example: bbe6fa3f-b11b-4b89-87e6-bb54511b8890
 *          title:
 *            type: string
 *            example: Saiba mais sobre o clean code
 *          author:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Fabricio
 *          category:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Entretenimento
 *          createdAt:
 *            type: string
 *            example: 2022-09-30T16:07:11.218Z
 *     getUserPosts:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            example: bbe6fa3f-b11b-4b89-87e6-bb54511b8890
 *          title:
 *            type: string
 *            example: Saiba mais sobre o clean code
 *          content:
 *            type: string
 *            example: string
 *          category:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Entretenimento
 *          createdAt:
 *            type: string
 *            example: 2022-09-30T16:07:11.218Z
 *     getPostById:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            example: bbe6fa3f-b11b-4b89-87e6-bb54511b8890
 *          title:
 *            type: string
 *            example: Saiba mais sobre o clean code
 *          content:
 *            type: string
 *            example: string
 *          category:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Entretenimento
 *          author:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Fabricio
 *          createdAt:
 *            type: string
 *            example: 2022-09-30T16:07:11.218Z
 */

const create = {
  body: object({
    categoryId: string()
      .defined('categoryId is required')
      .length(36, 'A valid categoryId has a string length of 36 characters'),
    title: string().defined('title is required'),
    content: string().defined('content is required'),
  }).defined(),
};

const update = {
  body: object({
    categoryId: string()
      .defined('categoryId is required')
      .length(36, 'A valid categoryId has a string length of 36 characters'),
    title: string().defined('title is required'),
    content: string().defined('content is required'),
  }).defined(),
};

const params = {
  params: object({ postId: string().defined('postId is required') }),
};

export const createPostSchema = object({
  ...create,
});

export const updatePostSchema = object({
  ...update,
  ...params,
});

export const onlyParamsPostSchema = object({
  ...params,
});

export type CreatePostInput = InferType<typeof createPostSchema>;
export type ReadPostInput = InferType<typeof onlyParamsPostSchema>;
export type UpdatePostInput = InferType<typeof updatePostSchema>;
export type DeletePostInput = InferType<typeof onlyParamsPostSchema>;
