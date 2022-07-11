import { Method } from '../../../types/methods';
import Logger from '../../../helpers/logger';
import auth from '../../../middlewares/auth';
import tokenModel from '../models/token.model';

const logger = Logger.create('backend:logout');

class LogOut {
  readonly method = Method.GET;
  readonly route = '/logout';
  readonly middlewares = [auth];

  async on(req: Request): Promise<any> {
    logger.info('User logout.');
    await tokenModel.deleteOne({ token: req.token.token });
    return {
      deleteJWT: true,
    };
  }
}

export default new LogOut();
