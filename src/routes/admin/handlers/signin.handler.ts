import { Request } from 'express';
import Logger from '../../../helpers/logger';
import { Method } from '../../../types/methods';
import TokenModel from '../models/token.model';
import { omit } from '../../../helpers/omit';
import AdminModel from '../models/admin.model';

const logger = Logger.create('backend:signin');

class Signin {
  readonly method = Method.POST;
  readonly route = '/signin';
  readonly middlewares = [];

  async on(req: Request): Promise<any> {
    const { username, password } = req.body;
    logger.info('Authenticating username', username);

    const admin = await AdminModel.findOne({ username });

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await admin.comparePassword(password);

    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = await TokenModel.generateToken(admin._id);

    return {
      admin: omit(admin.toJSON(), '_id password createdAt updatedAt __v'),
      token,
    };
  }
}

export default new Signin();
