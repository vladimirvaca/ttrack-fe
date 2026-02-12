import { z } from 'zod';

import { ExerciseType } from '@generated/model/exerciseType';

export const exerciseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.nativeEnum(ExerciseType),
  image: z.string().url('Image must be a valid URL'),
});
