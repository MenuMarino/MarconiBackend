import { Request } from 'express';
import Logger from 'src/helpers/logger';
import { omit } from 'src/helpers/omit';
import auth from 'src/middlewares/auth';
import { Method } from 'src/types/methods';
import DataModel, { IData } from '../models/data.model';

const logger = Logger.create('backend:get-data');

class GetData {
  readonly method = Method.GET;
  readonly route = '/get-data/:pageId?';
  readonly middlewares = [auth];

  async on(req: Request): Promise<any> {
    logger.info('Getting all data');
    const pageId = req.params.pageId;

    let data = [] as IData[];
    if (pageId) {
      data = await DataModel.find({ pageId });
    } else {
      data = await DataModel.find({});
    }

    // Borrar data de MongoDB
    const dataClean = data.map((d) => ({
      data: omit(d.toJSON(), '_id __v updatedAt createdAt'),
    }));

    const parsedData = dataClean.map((d) => ({
      pageId: d.data.pageId,
      ...d.data.info,
    }));

    // Obtener los headers de la tabla
    const headers = parsedData
      .map((prod) => Object.keys(prod))
      .reduce((acc: Record<string, unknown>, value: any) => {
        value.forEach((s: string) => {
          acc[s] = true;
        });
        return acc;
      }, {});
    const parsedHeaders = Object.keys(headers).map((key) => [
      String(key),
      (String(key).charAt(0).toUpperCase() + String(key).slice(1)).replace(
        '_',
        ' '
      ),
    ]);

    return {
      data: parsedData,
      headers: parsedHeaders.map((header) => ({
        Header: header[1],
        accessor: header[0],
      })),
    };
  }
}

export default new GetData();
