import { Schema, model } from 'mongoose';
import { DATABASES } from '../../constants';
import mongooseAutopopulate from 'mongoose-autopopulate';
import ISite from '../../interfaces/site.interface';

const SiteSchema = new Schema<ISite>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: DATABASES.USER,
      unique: true,
      autopopulate: true,
      required: true,
    },
    amount_to_earn: {
      type: Number,
      required: true,
      default: 0,
    },
    hourly_interval: {
      type: Number,
      required: true,
      default: 30,
    },
    status: {
      type: String,
      enum: ['active', 'terminated', 'suspended', 'pending', 'other'],
      default: 'active',
    },
    deleted: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

SiteSchema.plugin(mongooseAutopopulate);

const SiteModel = model<ISite>(DATABASES.SITE, SiteSchema);

export default SiteModel;
