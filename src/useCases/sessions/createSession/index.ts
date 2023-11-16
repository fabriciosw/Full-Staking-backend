import UserRepository from '../../../database/repositories/implementations/user.repository';
import CreateSessionController from './createSessionController';
import CreateSessionUseCase from './createSessionUseCase';

const userRepository = new UserRepository();

const useCase = new CreateSessionUseCase(userRepository);

const controller = new CreateSessionController(useCase);

export default controller;
