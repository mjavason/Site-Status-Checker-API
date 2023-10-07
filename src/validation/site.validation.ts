import { z } from 'zod';
import { Types } from 'mongoose';

class Validation {
  // Validation schema for creating a new blog post
  create = {
    body: z.object({
      title: z.string().min(1).max(255).trim(),
      content: z.string().min(1),
      author_mda: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
      tags: z.array(z.string().trim()),
      image: z.string(),
      min_read: z.string(),
      is_published: z.boolean().optional(),
    }),
  };

  // Validation schema for updating an existing blog post
  update = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
    body: z.object({
      title: z.string().min(1).max(255).trim().optional(),
      content: z.string().min(1).optional(),
      author_mda: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: 'Invalid ObjectId format',
        })
        .optional(),
      tags: z.array(z.string().trim()).optional(),
      likes: z
        .array(
          z.string().refine((value) => Types.ObjectId.isValid(value), {
            message: 'Invalid ObjectId format',
          })
        )
        .optional(),
      dislikes: z
        .array(
          z.string().refine((value) => Types.ObjectId.isValid(value), {
            message: 'Invalid ObjectId format',
          })
        )
        .optional(),
      image: z.string().optional(),
      min_read: z.string().optional(),
      is_published: z.boolean().optional(),
      deleted: z.boolean().optional(),
    }),
  };

  // Validation schema for deleting a blog post
  delete = {
    params: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
    }),
  };

  // Validation schema for retrieving blog posts with specific criteria
  find = {
    query: z.object({
      _id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }).optional(),
      title: z.string().optional(),
      author_mda: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: 'Invalid ObjectId format',
        })
        .optional(),
      is_published: z.string().optional(),
      deleted: z.string().optional(),
    }),
  };
}

export const siteValidation = new Validation();
