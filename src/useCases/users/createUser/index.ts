import UserRepository from '../../../database/repositories/implementations/user.repository';
import CreateUserController from './createUserController';
import CreateUserUseCase from './createUserUseCase';

const userRepository = new UserRepository();

const useCase = new CreateUserUseCase(userRepository);

const controller = new CreateUserController(useCase);

export default controller;
