import { z } from 'zod';
import { Types } from 'mongoose';

class SiteValidation {
  // Validation schema for creating a new site
  create = {
    body: z.object({
      user: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
      hourly_interval: z.number().int().positive(),
      link: z.string().min(1).trim(),
      status: z.enum(['active', 'suspended', 'other']).optional(),
      title: z.string().min(3).max(255), // Added the title field validation
    }),
  };

  // Validation schema for updating an existing site
  update = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
    body: z.object({
      user: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: 'Invalid ObjectId format',
        })
        .optional(),
      hourly_interval: z.number().int().positive().optional(),
      link: z.string().min(1).trim().optional(),
      status: z.enum(['active', 'suspended', 'other']).optional(),
      deleted: z.boolean().optional(),
      title: z.string().min(3).max(255), // Added the title field validation
    }),
  };

  // Validation schema for deleting a site
  delete = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
  };

  // Validation schema for retrieving sites with specific criteria
  find = {
    query: z.object({
      user: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: 'Invalid ObjectId format',
        })
        .optional(),
      hourly_interval: z.string().optional(),
      link: z.string().min(1).trim().optional(),
      status: z.enum(['active', 'suspended', 'other']).optional(),
    }),
  };
}

export const siteValidation = new SiteValidation();
