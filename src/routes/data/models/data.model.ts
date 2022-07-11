import { Document, ObjectId, Schema } from 'mongoose';
import datasource from 'src/helpers/datasource';

export interface IData extends Document {
  _id: ObjectId;
  pageId: String;
  info: any;
}

const Data = new Schema<IData>(
  {
    pageId: String,
    info: {},
  },
  { timestamps: true }
);

export default datasource.connection.model<IData>('data', Data);
