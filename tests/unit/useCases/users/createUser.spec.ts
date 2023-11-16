import UserRepositoryFake from '../../../../src/database/repositories/fakes/user.repository';
import CreateUserUseCase from '../../../../src/useCases/users/createUser/createUserUseCase';

describe('CreateUserUseCase', () => {
  const userRepositoryFake = new UserRepositoryFake();
  const sut = new CreateUserUseCase(userRepositoryFake);

  describe('Should not be able to', () => {
    it('create an user if email already exists on database', async () => {
      await expect(
        sut.execute({
          email: 'leandro@email.com',
          name: 'Leandro',
          password: '123456',
        })
      ).rejects.toThrow('EMAIL_ALREADY_REGISTERED');
    });
  });

  describe('Should be able to', () => {
    it('create an user', async () => {
      const user = await sut.execute({
        email: 'fabricio@email.com',
        name: 'Fabricio',
        password: '123456',
      });

      expect(user.email).toBe('fabricio@email.com');
    });
  });
});
