import { Schema, model } from 'mongoose';
import IUser from '../../interfaces/user.interface';
import { DATABASES } from '../../constants';

const UserSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    deleted: {
      type: Schema.Types.Boolean,
      required: false,
      select: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model<IUser>(DATABASES.USER, UserSchema);

export default UserModel;
