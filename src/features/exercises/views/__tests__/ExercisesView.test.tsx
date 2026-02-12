import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { useExercises } from '../../hooks/useExercises';
import ExercisesView from '../ExercisesView';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
  };
});
vi.mock('../../hooks/useExercises', () => ({
  useExercises: vi.fn(),
}));

const mockNavigate = vi.fn();

const queryClient = new QueryClient();
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

const pageableMock = {
  number: 0,
  size: 20,
  orderBy: [],
  sort: { orderBy: [] },
};

const baseQueryMock = {
  isPending: false,
  isLoading: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: true,
  isPlaceholderData: false,
  isError: false,
  queryKey: [],
  status: 'success',
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  isFetched: true,
  isFetchedAfterMount: true,
  isStale: false,
  isPaused: false,
  refetch: vi.fn(),
  remove: vi.fn(),
  fetchStatus: 'idle',
  isInitialLoading: false,
  isRefetching: false,
  isRestoring: false,
  isIdle: false,
  isActive: true,
  isInactive: false,
  isFetching: false,
  failureReason: null,
  errorUpdateCount: 0,
  isEnabled: true,
  promise: Promise.resolve(),
};

type MockReturn = typeof baseQueryMock & {
  data?: unknown;
  exercises?: unknown[];
  isLoading: boolean;
  isError: boolean;
  error?: { message: string } | null;
  status: string;
};

describe('ExercisesView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exercise table with data', async () => {
    (useExercises as unknown as { mockReturnValue: (value: MockReturn) => void }).mockReturnValue({
      ...baseQueryMock,
      data: { content: [
        {
          id: 1,
          name: 'Bench Press',
          type: 'STRENGTH',
          description: 'Chest exercise',
          image: 'https://img.com/bench.jpg',
        },
        {
          id: 2,
          name: 'Running',
          type: 'CARDIO',
          description: 'Cardio exercise',
          image: 'https://img.com/run.jpg',
        },
      ], pageable: pageableMock },
      exercises: [
        {
          id: 1,
          name: 'Bench Press',
          type: 'STRENGTH',
          description: 'Chest exercise',
          image: 'https://img.com/bench.jpg',
        },
        {
          id: 2,
          name: 'Running',
          type: 'CARDIO',
          description: 'Cardio exercise',
          image: 'https://img.com/run.jpg',
        },
      ],
      isLoading: false,
      isError: false,
      error: null,
      status: 'success',
    });
    renderWithProviders(<ExercisesView />);
    expect(await screen.findByText('Exercise Management')).toBeInTheDocument();
    expect(await screen.findByText('Bench Press')).toBeInTheDocument();
    expect(await screen.findByText('Running')).toBeInTheDocument();
    expect(await screen.findByText('STRENGTH')).toBeInTheDocument();
    expect(await screen.findByText('CARDIO')).toBeInTheDocument();
    expect(await screen.findByText('Chest exercise')).toBeInTheDocument();
    expect(await screen.findByText('Cardio exercise')).toBeInTheDocument();
  });

  it('shows error message when error occurs', async () => {
    (useExercises as unknown as { mockReturnValue: (value: MockReturn) => void }).mockReturnValue({
      ...baseQueryMock,
      data: undefined,
      exercises: [],
      isLoading: false,
      isError: true,
      error: { message: 'Failed to load exercises.' },
      status: 'error',
    });
    renderWithProviders(<ExercisesView />);
    expect(await screen.findByText('Failed to load exercises.')).toBeInTheDocument();
  });

  it('navigates to create exercise page when button is clicked', async () => {
    (useExercises as unknown as { mockReturnValue: (value: MockReturn) => void }).mockReturnValue({
      ...baseQueryMock,
      data: { content: [], pageable: pageableMock },
      exercises: [],
      isLoading: false,
      isError: false,
      error: null,
      status: 'success',
    });
    renderWithProviders(<ExercisesView />);
    const createBtn = screen.getByText('Create New Exercise');
    createBtn.click();
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/exercises/create');
    });
  });
});
