import { Method } from '../../../types/methods';
import Logger from '../../../helpers/logger';
import auth from '../../../middlewares/auth';
import DataModel from '../models/data.model';
import { omit } from 'src/helpers/omit';

const logger = Logger.create('backend:get-pages');

class GetPages {
  readonly method = Method.GET;
  readonly route = '/pages';
  readonly middlewares = [auth];

  async on(): Promise<any> {
    logger.info('Get pages');
    const data = await DataModel.find({});

    return {
      pages: data.map((d) => {
        return omit(d.toJSON(), '_id info createdAt updatedAt __v').pageId;
      }),
    };
  }
}

export default new GetPages();
