import PostRepositoryFake from '../../../../src/database/repositories/fakes/post.repository';
import ReadUserPostsUseCase from '../../../../src/useCases/posts/readUserPosts/readUserPostsUseCase';

describe('ReadUserPostsUseCase', () => {
  const postRepositoryFake = new PostRepositoryFake();
  const sut = new ReadUserPostsUseCase(postRepositoryFake);

  describe('Should be able to', () => {
    it('find a post by user id', async () => {
      const posts = await sut.execute({
        userId: '0d98b398-2c58-4c87-ac76-df5e6874073b',
      });

      expect(posts).toHaveLength(2);
      expect(posts[0]).toHaveProperty('id');
      expect(posts[0]).toHaveProperty('createdAt');
      expect(posts[0]).toHaveProperty('title');
      expect(posts[0]).toHaveProperty('content');
      expect(posts[0]).toHaveProperty('category.name');
    });
  });
});
