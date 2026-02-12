import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { useCreateExercise } from '../../hooks/useCreateExercise';
import CreateExerciseView from '../CreateExerciseView';

import type { ExerciseDTO } from '@generated/model/exerciseDTO';
import type {
  UseMutationResult,
  MutationObserverIdleResult,
  MutationObserverLoadingResult,
  MutationObserverErrorResult,
  UseMutateFunction,
  UseMutateAsyncFunction
} from '@tanstack/react-query';
import type { MockInstance } from 'vitest';

vi.mock('../../hooks/useCreateExercise');

const testQueryClient = new QueryClient();

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

// Helper to create UseMutationResult for idle state
function createIdleMutationMock(
  overrides: Partial<UseMutationResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>> = {}
): UseMutationResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown> {
  return {
    mutate: vi.fn() as unknown as UseMutateFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>,
    mutateAsync: vi.fn() as unknown as UseMutateAsyncFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>,
    reset: vi.fn(),
    status: 'idle',
    data: undefined,
    error: null,
    isError: false,
    isIdle: true,
    isPending: false,
    isPaused: false,
    isSuccess: false,
    variables: undefined,
    context: undefined,
    failureCount: 0,
    failureReason: null,
    submittedAt: 0,
    ...overrides,
  } as MutationObserverIdleResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown> & {
    mutate: UseMutateFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>;
    mutateAsync: UseMutateAsyncFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>;
    reset: () => void;
  };
}

// Helper to create UseMutationResult for loading state
function createLoadingMutationMock(
  overrides: Partial<UseMutationResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>> = {}
): UseMutationResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown> {
  return {
    mutate: vi.fn() as unknown as UseMutateFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>,
    mutateAsync: vi.fn() as unknown as UseMutateAsyncFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>,
    reset: vi.fn(),
    status: 'pending',
    data: undefined,
    error: null,
    isError: false,
    isIdle: false,
    isPending: true,
    isPaused: false,
    isSuccess: false,
    variables: { data: {} as ExerciseDTO },
    context: undefined,
    failureCount: 0,
    failureReason: null,
    submittedAt: 0,
    ...overrides,
  } as MutationObserverLoadingResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown> & {
    mutate: UseMutateFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>;
    mutateAsync: UseMutateAsyncFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>;
    reset: () => void;
  };
}

// Helper to create UseMutationResult for error state
function createErrorMutationMock(
  overrides: Partial<UseMutationResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>> = {}
): UseMutationResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown> {
  return {
    mutate: vi.fn() as unknown as UseMutateFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>,
    mutateAsync: vi.fn() as unknown as UseMutateAsyncFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>,
    reset: vi.fn(),
    status: 'idle',
    data: undefined,
    error: { message: 'Failed to create exercise.' },
    isError: true,
    isIdle: false,
    isPending: false,
    isPaused: false,
    isSuccess: false,
    variables: { data: {} as ExerciseDTO },
    context: undefined,
    failureCount: 0,
    failureReason: null,
    submittedAt: 0,
    ...overrides,
  } as MutationObserverErrorResult<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown> & {
    mutate: UseMutateFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>;
    mutateAsync: UseMutateAsyncFunction<ExerciseDTO, unknown, { data: ExerciseDTO }, unknown>;
    reset: () => void;
  };
}

describe('CreateExerciseView', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all form fields and buttons', () => {
    (useCreateExercise as unknown as MockInstance).mockReturnValue(createIdleMutationMock());
    renderWithRouter(<CreateExerciseView />);
    expect(screen.getByTestId('exercise-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('exercise-type-dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('exercise-description-input')).toBeInTheDocument();
    expect(screen.getByTestId('exercise-image-input')).toBeInTheDocument();
    expect(screen.getByTestId('exercise-cancel-btn')).toBeInTheDocument();
    expect(screen.getByTestId('exercise-save-btn')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    (useCreateExercise as unknown as MockInstance).mockReturnValue(createIdleMutationMock());
    renderWithRouter(<CreateExerciseView />);
    fireEvent.click(screen.getByTestId('exercise-save-btn'));
    await waitFor(() => {
      // Check for at least one required error message
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  it('calls mutate on valid form submission', async () => {
    const mockMutate = vi.fn();
    (useCreateExercise as unknown as MockInstance).mockReturnValue(createIdleMutationMock({ mutate: mockMutate }));
    renderWithRouter(<CreateExerciseView />);
    fireEvent.change(screen.getByTestId('exercise-name-input'), { target: { value: 'Bench Press' } });
    // Open the dropdown
    fireEvent.click(screen.getByTestId('exercise-type-dropdown'));
    // Select the STRENGTH option (find by text in portal)
    const option = await within(document.body).findByText('STRENGTH');
    fireEvent.click(option);
    fireEvent.change(screen.getByTestId('exercise-description-input'), { target: { value: 'A chest exercise.' } });
    fireEvent.change(screen.getByTestId('exercise-image-input'), { target: { value: 'https://img.com/bench.jpg' } });
    fireEvent.click(screen.getByTestId('exercise-save-btn'));
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it('shows loading indicator when saving', () => {
    (useCreateExercise as unknown as MockInstance).mockReturnValue(
      createLoadingMutationMock()
    );
    renderWithRouter(<CreateExerciseView />);
    expect(screen.getByTestId('exercise-loading')).toBeInTheDocument();
  });

  it('shows error message on mutation error', () => {
    (useCreateExercise as unknown as MockInstance).mockReturnValue(
      createErrorMutationMock()
    );
    renderWithRouter(<CreateExerciseView />);
    expect(screen.getByTestId('exercise-error')).toHaveTextContent('Failed to create exercise.');
  });
});
