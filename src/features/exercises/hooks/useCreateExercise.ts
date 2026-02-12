import { useCreate } from '@generated/exercise/exercise';

export const useCreateExercise = (options = {}) => {
  // Wrap Orval's useCreate for custom error handling or side effects
  return useCreate(options);
};
