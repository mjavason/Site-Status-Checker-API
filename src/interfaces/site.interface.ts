import { Types } from 'mongoose';

export default interface ISite {
  _id?: string;
  user: string | Types.ObjectId;
  title: string;
  hourly_interval: number;
  link: string;
  status: string;
  deleted?: boolean;
}
