import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const ext = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let authorization = req.get('authorization');
    if (!authorization) {
      throw new Error('You are not authenticated');
    }
    authorization = authorization.replace('Bearer', '').trim();

    if (authorization !== process.env.EXT_KEY) {
      throw new Error('You are not authenticated');
    }
    next();
  } catch (err) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(Error('You are not authenticated'));
  }
};

export default ext;
