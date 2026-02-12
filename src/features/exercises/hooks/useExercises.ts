import { useGetAll } from '@generated/exercise/exercise.ts';

import { exerciseSchema } from '../schemas/exerciseSchema';

import type { ExerciseDTO, GetAllParams , SortOrder  } from '@generated/model';

export const useExercises = (params: Partial<GetAllParams> = {}) => {
  // Orval requires pageable param, so provide a default
  const queryParams: GetAllParams = {
    pageable: {
      number: 0, // page number
      size: 20,  // page size
      orderBy: [
        {
          ignoreCase: false,
          direction: 'ASC',
          property: 'name',
        } as SortOrder,
      ],
      sort: {
        orderBy: [
          {
            ignoreCase: false,
            direction: 'ASC',
            property: 'name',
          } as SortOrder,
        ],
      },
    },
    ...params,
  };

  const query = useGetAll(queryParams);

  // Validate and parse each exercise
  type ParseResult = ReturnType<typeof exerciseSchema.safeParse>;
  const exercises: ExerciseDTO[] =
    query.data && Array.isArray(query.data.content)
      ? query.data.content
          .map((item: unknown): ParseResult => exerciseSchema.safeParse(item))
          .filter((result: ParseResult) => result.success)
          .map((result: ParseResult) => result.data as ExerciseDTO)
      : [];

  return {
    ...query,
    exercises,
  };
};
