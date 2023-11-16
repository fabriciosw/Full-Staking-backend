import supertest from 'supertest';
import app from '../../src/app';
import connection from '../testsConnection';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

let userToken: string;
let adminToken: string;
let postCategoryId: string;
let postId: string;

describe('App', () => {
  it('should return hello world', async () => {
    const { status, body } = await supertest(app).get('/api/healthcheck');
    expect(status).toBe(200);
    expect(body.message).toBe('Hello World');
  });
});

describe('api/v1/users', () => {
  describe('POST /', () => {
    it('should be able to create an user', async () => {
      const { status, body } = await supertest(app).post('/api/v1/users').send({
        name: 'Red Wacky League Antlez',
        email: 'red.Wacky@gmail.com',
        password: '12345',
      });

      expect(status).toBe(201);
      expect(body.message).toBe('User created');
    });

    it('should return error if email is already registered', async () => {
      const { status, body } = await supertest(app).post('/api/v1/users').send({
        name: 'Red Wacky League Antlez',
        email: 'red.Wacky@gmail.com',
        password: '12345',
      });

      expect(status).toBe(409);
      expect(body.message).toBe('EMAIL_ALREADY_REGISTERED');
    });

    it('should return what properties from request are missing', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/users')
        .send({});

      expect(status).toBe(400);
      expect(body).toStrictEqual([
        'name is required',
        'email is required',
        'password is required',
      ]);
    });
  });
});

describe('api/v1/sessions', () => {
  describe('POST /', () => {
    it('should be able to create a session', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/sessions')
        .send({
          email: 'red.Wacky@gmail.com',
          password: '12345',
        });

      expect(status).toBe(201);
      expect(body.message).toBe('LOGGED_IN');
      expect(body.token.length).toBeGreaterThan(205);

      userToken = body.token;
    });

    it('should be able to create an admin session', async () => {
      const { body } = await supertest(app).post('/api/v1/sessions').send({
        email: 'fabricio.seb1@gmail.com',
        password: '12345',
      });

      expect(body.token.length).toBeGreaterThan(205);

      adminToken = body.token;
    });

    it('should return error if email is wrong', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/sessions')
        .send({
          name: 'Red Wacky League Antlez',
          email: 'red.Wacky@gil.com',
          password: '12345',
        });

      expect(status).toBe(401);
      expect(body.message).toBe('INVALID_CREDENTIALS');
    });

    it('should return error if password is wrong', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/sessions')
        .send({
          name: 'Red Wacky League Antlez',
          email: 'red.Wacky@gmail.com',
          password: '12345ada',
        });

      expect(status).toBe(401);
      expect(body.message).toBe('INVALID_CREDENTIALS');
    });

    it('should return what properties from request are missing', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/sessions')
        .send({});

      expect(status).toBe(400);
      expect(body).toStrictEqual(['email is required', 'password is required']);
    });
  });
});

describe('api/v1/postCategories', () => {
  describe('POST /', () => {
    it('should be able to create a postCategory', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/postCategories')
        .send({
          name: 'Entretenimento',
        })
        .set('Authorization', adminToken);

      expect(status).toBe(201);
      expect(body.message).toBe('Post category created');
      expect(body.postCategory.id.length).toBe(36);

      postCategoryId = body.postCategory.id;
    });

    it('should not be able to create a postCategory if there is already an category with that name', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/postCategories')
        .send({
          name: 'Entretenimento',
        })
        .set('Authorization', adminToken);

      expect(status).toBe(409);
      expect(body.message).toBe('CATEGORY_NAME_ALREADY_REGISTERED');
    });

    it('should reject if required fields are not sent', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/postCategories')
        .send({})
        .set('Authorization', adminToken);

      expect(status).toBe(400);
      expect(body).toStrictEqual(['name is required']);
    });

    it('should reject if token is not sent', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/postCategories')
        .send({ name: 'Entretenimento' });

      expect(status).toBe(401);
      expect(body.message).toStrictEqual('NOT_LOGGED');
    });

    it('should reject if user is not adm', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/postCategories')
        .send({ name: 'Entretenimento' })
        .set('Authorization', userToken);

      expect(status).toBe(403);
      expect(body.message).toStrictEqual('USER_IS_NOT_ADM');
    });
  });

  describe('GET /', () => {
    it('should get all post categories', async () => {
      const { status, body } = await supertest(app).get(
        '/api/v1/postCategories'
      );

      expect(status).toBe(200);
      expect(body[0]).toHaveProperty('id');
      expect(body[0]).toHaveProperty('name');
      expect(body[0]).toHaveProperty('createdAt');
      expect(body[0]).toHaveProperty('updatedAt');
    });
  });
});

describe('api/v1/posts', () => {
  describe('POST /', () => {
    it('should be able to create a post', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/posts')
        .send({
          title: 'Saiba mais sobre o clean code',
          categoryId: postCategoryId,
          content: 'string',
        })
        .set('Authorization', userToken);

      expect(status).toBe(201);
      expect(body.message).toBe('Post created');
      expect(body.post.id.length).toBe(36);

      postId = body.post.id;
    });

    it('should not be able to create a post if categoryId does not exist', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/posts')
        .send({
          title: 'Saiba mais sobre o clean code',
          categoryId: 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
          content: 'string',
        })
        .set('Authorization', adminToken);

      expect(status).toBe(404);
      expect(body.message).toBe('CATEGORY_ID_DOES_NOT_EXIST');
    });

    it('should reject if required fields are not sent', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/posts')
        .send({})
        .set('Authorization', adminToken);

      expect(status).toBe(400);
      expect(body).toStrictEqual([
        'categoryId is required',
        'title is required',
        'content is required',
      ]);
    });

    it('should reject if token is not sent', async () => {
      const { status, body } = await supertest(app).post('/api/v1/posts').send({
        title: 'Saiba mais sobre o clean code',
        categoryId: postCategoryId,
        content: 'string',
      });

      expect(status).toBe(401);
      expect(body.message).toStrictEqual('NOT_LOGGED');
    });
  });

  describe('GET /', () => {
    it('should get all posts', async () => {
      const { status, body } = await supertest(app).get('/api/v1/posts');

      expect(status).toBe(200);
      expect(body).toHaveLength(1);
    });
  });

  describe('GET /:postId', () => {
    it('should get a post by id', async () => {
      const { status, body } = await supertest(app).get(
        `/api/v1/posts/${postId}`
      );

      expect(status).toBe(200);
      expect(body.title).toBe('Saiba mais sobre o clean code');
    });

    it('should return 404 if id does not exist', async () => {
      const { status, body } = await supertest(app).get(
        `/api/v1/posts/${postId}a`
      );

      expect(status).toBe(404);
      expect(body.message).toBe('POST_ID_DOES_NOT_EXIST');
    });
  });

  describe('GET /me', () => {
    it("should get user's posts", async () => {
      const { status, body } = await supertest(app)
        .get(`/api/v1/posts/me`)
        .set('Authorization', userToken);

      expect(status).toBe(200);
      expect(body.length).toBe(1);
    });

    it('should return 404 if id does not exist', async () => {
      const { status, body } = await supertest(app).get(`/api/v1/posts/me`);

      expect(status).toBe(401);
      expect(body.message).toBe('NOT_LOGGED');
    });
  });
});
