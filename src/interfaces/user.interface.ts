import { Types } from 'mongoose';

export default interface IUser extends Document {
  _id?: string | Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  account_balance: number;
  deleted?: boolean;
}
