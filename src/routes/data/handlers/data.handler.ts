import { Request } from 'express';
import { emitter } from '../../../helpers/emitter';
import { Events } from '../../../helpers/events';
import Logger from '../../../helpers/logger';
import { Method } from '../../../types/methods';
import ext from '../../../middlewares/ext';

const logger = Logger.create('backend:router:product');

class Product {
  readonly method = Method.POST;
  readonly route = '/data';
  readonly middlewares = [ext];

  async on(req: Request): Promise<any> {
    emitter.emit(Events.DATA_SUBMITTED, req.body);
    logger.info('Data saved');
    return {};
  }
}

export default new Product();
