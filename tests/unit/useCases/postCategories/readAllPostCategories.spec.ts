import PostCategoryRepositoryFake from '../../../../src/database/repositories/fakes/postCategory.repository';
import ReadAllPostCategoriesUseCase from '../../../../src/useCases/postCategories/readAllPostCategories/readAllPostCategoriesUseCase';

describe('ReadAllPostCategoriesUseCase', () => {
  const postCategoryRepositoryFake = new PostCategoryRepositoryFake();
  const sut = new ReadAllPostCategoriesUseCase(postCategoryRepositoryFake);

  describe('Should be able to', () => {
    it('read all post categories', async () => {
      const postCategories = await sut.execute();

      expect(postCategories.length).toBe(2);
    });
  });
});
