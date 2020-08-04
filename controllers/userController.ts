import { Router, Request, Response } from '../serverDeps.ts';
import { signup, login } from './utils/mod.ts';

const userController = new Router();

userController.post('/signup', signup);
userController.post('/login', login);

// auth errors handling
function authError(error: Error, req: Request, res: Response) {
  res
    .status(401)
    .setHeader('Content-Type', 'application/json')
    .send({ msg: error.message });
}

userController.error('/signup', authError);
userController.error('/login', authError);

export default userController;
