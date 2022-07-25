import Logger from '../../../helpers/logger';
import DataModel from '../models/data.model';

const logger = Logger.create('backend:events:data');

class DataSubscriber {
  async onSubmit(body: any) {
    try {
      const { pageId, info } = body;
      logger.info(`PageId: ${pageId}. Body: ${JSON.stringify(body)}`);
      const data = await DataModel.findOne({
        pageId,
      });
      if (!data) {
        let auxObj = {};
        auxObj['views'] = 1;
        for (let [key, value] of Object.entries(info)) {
          key = key.toLowerCase();
          if (typeof value === 'boolean') {
            auxObj[key] = value ? 1 : 0;
          } else {
            // Number
            auxObj[key] = value;
          }
        }
        const newData = new DataModel({
          pageId,
          info: auxObj,
        });
        await newData.save();
      } else {
        for (let [key, value] of Object.entries(info)) {
          key = key.toLowerCase();
          if (data.info[key] === undefined) {
            if (typeof value === 'boolean') {
              data.info[key] = value ? 1 : 0;
            } else {
              // Number
              data.info[key] = value;
            }
          } else {
            if (typeof value === 'boolean') {
              data.info[key] = data.info[key] + (value ? 1 : 0);
            } else {
              data.info[key] += value;
            }
          }
        }
        data.info['views'] += 1;
        data.markModified('info');
        await data.save();
      }
    } catch (err) {
      logger.error(err);
    }
  }
}

export default new DataSubscriber();
