import PostRepositoryFake from '../../../../src/database/repositories/fakes/post.repository';
import PostCategoryRepositoryFake from '../../../../src/database/repositories/fakes/postCategory.repository';
import CreatePostUseCase from '../../../../src/useCases/posts/createPost/createPostUseCase';

describe('CreatePostUseCase', () => {
  const postRepositoryFake = new PostRepositoryFake();
  const postCategoryRepositoryFake = new PostCategoryRepositoryFake();

  const sut = new CreatePostUseCase(
    postRepositoryFake,
    postCategoryRepositoryFake
  );

  describe('Should not be able to', () => {
    it('create a post if category does not exists on database', async () => {
      await expect(
        sut.execute({
          title: 'Faça a sua: Las roldanas',
          categoryId: 'c9694ef5-7476-4790-9c01-073654jd29af',
          content:
            'Uma roda de roldana ou polia é uma roda ranhurada frequentemente usada para segurar uma correia, cabo de aço ou corda e incorporada a uma polia. A roldana gira em um eixo ou rolamento dentro da estrutura da polia. Isso permite que o fio ou o cabo se mova livremente, minimizando o atrito e o desgaste do cabo. ',
          userId: '0d98b398-2c58-4c87-ac76-d0986874073b',
        })
      ).rejects.toThrow('CATEGORY_ID_DOES_NOT_EXIST');
    });
  });

  describe('Should be able to', () => {
    it('create a category', async () => {
      const postCategory = await sut.execute({
        title: 'Faça a sua: Las roldanas',
        categoryId: 'c9694ef5-7476-4790-9c01-07359c5f29af',
        content:
          'Uma roda de roldana ou polia é uma roda ranhurada frequentemente usada para segurar uma correia, cabo de aço ou corda e incorporada a uma polia. A roldana gira em um eixo ou rolamento dentro da estrutura da polia. Isso permite que o fio ou o cabo se mova livremente, minimizando o atrito e o desgaste do cabo. ',
        userId: '0d98b398-2c58-4c87-ac76-d0986874073b',
      });

      expect(postCategory).toHaveProperty('id');
      expect(postCategory).toHaveProperty('createdAt');
    });
  });
});
