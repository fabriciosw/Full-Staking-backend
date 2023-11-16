import PostCategoryRepositoryFake from '../../../../src/database/repositories/fakes/postCategory.repository';
import CreatePostCategoryUseCase from '../../../../src/useCases/postCategories/createPostCategory/createPostCategoryUseCase';

describe('CreatePostCategoryUseCase', () => {
  const postCategoryRepositoryFake = new PostCategoryRepositoryFake();
  const sut = new CreatePostCategoryUseCase(postCategoryRepositoryFake);

  describe('Should not be able to', () => {
    it('create a category if name already exists on database', async () => {
      await expect(
        sut.execute({
          name: 'Tecnologia',
        })
      ).rejects.toThrow('CATEGORY_NAME_ALREADY_REGISTERED');
    });
  });

  describe('Should be able to', () => {
    it('create a category', async () => {
      const postCategory = await sut.execute({
        name: 'Política',
      });

      expect(postCategory.name).toBe('Política');
    });
  });
});
