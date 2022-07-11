import { EventEmitter } from 'events';
import { Application } from 'express';
import { Events } from './helpers/events';
import Logger from './helpers/logger';
import DataSubscriber from './routes/data/subscriber/data.subscriber';

const logger = Logger.create('backend:events');

export default (app: Application) => {
  const emitter: EventEmitter = app.get('emitter');

  logger.info(`Event: ${Events.DATA_SUBMITTED}`);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  emitter.on(Events.DATA_SUBMITTED, DataSubscriber.onSubmit);
};
