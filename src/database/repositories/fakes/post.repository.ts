import Post from '../../entities/Post.Entity';
import UserRepositoryFake from './user.repository';
import PostCategoryRepositoryFake from './postCategory.repository';
import {
  ICreate,
  IFindByAuthorId,
  IFindById,
  IPostRepository,
  IReadAll,
} from '../interfaces/PostRepository';

export default class PostRepositoryFake implements IPostRepository {
  userRepositoryFake = new UserRepositoryFake();

  postCategoryRepositoryFake = new PostCategoryRepositoryFake();

  mockPosts = [
    {
      id: '668e8e4f-9ac2-4f77-abcc-3af9ff89dbc1',
      author: { id: '0d98b398-2c58-4c87-ac76-df5e6874073b' },
      category: { id: 'ca8ceb0b-3702-4b21-9ce3-48192677bd1d' },
      content: 'Lorem Ipsum amet',
      title: 'lorem',
      createdAt: new Date('2022-09-28 17:53:22.930'),
      updatedAt: new Date('2022-09-28 17:53:22.930'),
    },
    {
      id: '668e8e4f-9ac2-4f77-abcc-3af9ff89dbc2',
      author: { id: '0d98b398-2c58-4c87-ac76-df5e6874073b' },
      category: { id: 'ca8ceb0b-3702-4b21-9ce3-48192677bd1d' },
      content: 'Lorem Ipsum amet',
      title: 'lorem',
      createdAt: new Date('2022-09-28 17:53:22.930'),
      updatedAt: new Date('2022-09-28 17:53:22.930'),
    },
    {
      id: '668e8e4f-9ac2-4f77-abcc-3af9ff89dbc3',
      author: { id: '0d98b398-2c58-4c87-ac76-d0986874073b' },
      category: { id: 'ca8ceb0b-3702-4b21-9ce3-48192677bd1d' },
      content: 'Bolo de banana - banana',
      title: 'Bolo de banana',
      createdAt: new Date('2022-09-28 17:53:22.930'),
      updatedAt: new Date('2022-09-28 17:53:22.930'),
    },
  ];

  async create(post: ICreate): Promise<Post> {
    const newPost = {
      ...post,
      author: { id: post.authorId },
      category: { id: post.categoryId },
      id: '0d98b398-2c58-4c87-ac76-df5e6874073a',
      createdAt: new Date(Date.now().valueOf()),
      updatedAt: new Date(Date.now().valueOf()),
    };

    return newPost as unknown as Post;
  }

  async save(post: Post): Promise<Post> {
    this.mockPosts.push(post);

    return post;
  }

  async findById(postId: string): Promise<IFindById | undefined> {
    const post = this.mockPosts.find((onePost) => onePost.id === postId);

    if (!post) return undefined;

    const { author, category, createdAt, title, id, content } = post;

    const foundUser = this.userRepositoryFake.mockUsers.find(
      (user) => user.id === author.id
    );

    if (!foundUser) throw new Error('Invalid fake relation');

    const foundCategory = this.postCategoryRepositoryFake.mockCategories.find(
      (postCategory) => postCategory.id === category.id
    );

    if (!foundCategory) throw new Error('Invalid fake relation');

    const postObj = {
      id,
      title,
      createdAt,
      content,
      author: {
        name: foundUser.name,
      },
      category: {
        name: foundCategory.name,
      },
    };

    return postObj;
  }

  async findByAuthorId(authorId: string): Promise<IFindByAuthorId> {
    const foundPosts = this.mockPosts.filter(
      (post) => post.author.id === authorId
    );

    const joinedPosts = foundPosts.map((post) => {
      const foundCategory = this.postCategoryRepositoryFake.mockCategories.find(
        (category) => category.id === post.category.id
      );

      if (!foundCategory) throw new Error('Invalid fake relation');

      const obj = {
        ...post,
        category: {
          name: foundCategory.name,
        },
      };

      return obj;
    });

    return joinedPosts;
  }

  async readAll(): Promise<IReadAll> {
    const posts = this.mockPosts.map((post) => {
      const { author, category, createdAt, title, id } = post;

      const foundUser = this.userRepositoryFake.mockUsers.find(
        (user) => user.id === author.id
      );

      if (!foundUser) throw new Error('Invalid fake relation');

      const foundCategory = this.postCategoryRepositoryFake.mockCategories.find(
        (postCategory) => postCategory.id === category.id
      );

      if (!foundCategory) throw new Error('Invalid fake relation');

      const postObj = {
        id,
        title,
        createdAt,
        author: {
          name: foundUser?.name,
        },
        category: {
          name: foundCategory?.name,
        },
      };

      return postObj;
    });

    return posts;
  }
}
