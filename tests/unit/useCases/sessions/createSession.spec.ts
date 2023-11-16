import UserRepositoryFake from '../../../../src/database/repositories/fakes/user.repository';
import CreateSessionUseCase from '../../../../src/useCases/sessions/createSession/createSessionUseCase';

describe('CreateSessionUseCase', () => {
  const userRepositoryFake = new UserRepositoryFake();
  const sut = new CreateSessionUseCase(userRepositoryFake);

  describe('Should not be able to', () => {
    it('create a session with invalid email', async () => {
      await expect(
        sut.execute({
          email: 'leanASKJDKLJkljalkdaSJKDKIOAdjkASDdro@email.com',
          password: '12345',
        })
      ).rejects.toThrow('INVALID_CREDENTIALS');
    });

    it('create a session with invalid password', async () => {
      await expect(
        sut.execute({
          email: 'leandro@email.com',
          password: '123dlokmcsd9812e09klqwdçqD45',
        })
      ).rejects.toThrow('INVALID_CREDENTIALS');
    });
  });

  describe('Should be able to', () => {
    it('create a session with valid credentials', async () => {
      const user = await sut.execute({
        email: 'leandro@email.com',
        password: '12345',
      });

      expect(user).toHaveLength(208);
    });
  });
});
