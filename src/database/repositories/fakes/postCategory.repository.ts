import PostCategory from '../../entities/PostCategory.Entity';
import {
  ICreatePostCategory,
  IPostCategoryRepository,
} from '../interfaces/PostCategoryRepository';

export default class PostCategoryRepositoryFake
  implements IPostCategoryRepository
{
  mockCategories: PostCategory[] = [
    {
      id: 'ca8ceb0b-3702-4b21-9ce3-48192677bd1d',
      name: 'Tecnologia',
      createdAt: new Date('2022-09-28 17:53:22.930'),
      updatedAt: new Date('2022-09-28 17:53:22.930'),
      posts: [],
    },
    {
      id: 'c9694ef5-7476-4790-9c01-07359c5f29af',
      name: 'Maestria',
      createdAt: new Date('2022-09-28 17:53:22.930'),
      updatedAt: new Date('2022-09-28 17:53:22.930'),
      posts: [],
    },
  ];

  async create(postCategory: ICreatePostCategory): Promise<PostCategory> {
    const newUser = {
      ...postCategory,
      posts: [],
      id: '0d98b398-2c58-4c87-ac76-df5e6874073a',
      createdAt: new Date(Date.now().valueOf()),
      updatedAt: new Date(Date.now().valueOf()),
    };

    return newUser;
  }

  async save(postCategory: PostCategory): Promise<PostCategory> {
    this.mockCategories.push(postCategory);

    return postCategory;
  }

  async findById(id: string): Promise<PostCategory | undefined> {
    const foundCategory = this.mockCategories.find(
      (category) => category.id === id
    );

    return foundCategory;
  }

  async findByName(name: string): Promise<PostCategory | undefined> {
    const foundCategory = this.mockCategories.find(
      (category) => category.name === name
    );

    return foundCategory;
  }

  async readAll(): Promise<PostCategory[]> {
    return this.mockCategories;
  }
}
