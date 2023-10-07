import { Schema, model } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';
import { DATABASES } from '../../constants';
import ISite from '../../interfaces/site.interface';

const SiteSchema = new Schema<ISite>(
  {
    // Reference to the user who owns the site
    user: {
      type: Schema.Types.ObjectId,
      ref: DATABASES.USER,
      unique: true,
      autopopulate: true,
      required: true,
    },
    title:{
      type: String,
      required:true
    },
    // Hourly interval for site checks
    hourly_interval: {
      type: Number,
      required: true,
      default: 1,
    },
    link: {
      type: String,
      required: true,
    },
    // Status of the site
    status: {
      type: String,
      enum: ['active', 'suspended', 'other'],
      default: 'active',
    },
    // Flag to indicate if the site is deleted
    deleted: {
      type: Boolean,
      required: true,
      select: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Plugin for autopopulating the 'user' field when querying
SiteSchema.plugin(mongooseAutopopulate);

// Create and export the Site model
const SiteModel = model<ISite>(DATABASES.SITE, SiteSchema);

export default SiteModel;
