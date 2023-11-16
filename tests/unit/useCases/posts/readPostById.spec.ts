import PostRepositoryFake from '../../../../src/database/repositories/fakes/post.repository';
import ReadPostByIdPostsUseCase from '../../../../src/useCases/posts/readPostById/readPostByIdPostsUseCase';

describe('ReadPostByIdPostsUseCase', () => {
  const postRepositoryFake = new PostRepositoryFake();
  const sut = new ReadPostByIdPostsUseCase(postRepositoryFake);

  describe('Should not be able to', () => {
    it('find a post if id does not exist', async () => {
      await expect(
        sut.execute('777e8e4f-9ac2-4f77-abcc-3af9ff89d777')
      ).rejects.toThrow('POST_ID_DOES_NOT_EXIST');
    });
  });

  describe('Should be able to', () => {
    it('find a post', async () => {
      const post = await sut.execute('668e8e4f-9ac2-4f77-abcc-3af9ff89dbc3');

      expect(post.id).toBe('668e8e4f-9ac2-4f77-abcc-3af9ff89dbc3');
      expect(post.title).toBe('Bolo de banana');
      expect(post.content).toBe('Bolo de banana - banana');
      expect(post.author).toHaveProperty('name');
      expect(post.category).toHaveProperty('name');
    });
  });
});
