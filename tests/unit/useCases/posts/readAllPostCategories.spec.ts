import PostRepositoryFake from '../../../../src/database/repositories/fakes/post.repository';
import ReadAllPostsUseCase from '../../../../src/useCases/posts/readAllPosts/readAllPostsUseCase';

describe('ReadAllPostsUseCase', () => {
  const postRepositoryFake = new PostRepositoryFake();
  const sut = new ReadAllPostsUseCase(postRepositoryFake);

  describe('Should be able to', () => {
    it('read all posts', async () => {
      const posts = await sut.execute();

      expect(posts.length).toBe(3);
    });
  });
});
