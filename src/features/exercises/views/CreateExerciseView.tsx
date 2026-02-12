import { zodResolver } from '@hookform/resolvers/zod';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ExerciseType } from '@generated/model/exerciseType';

import { useCreateExercise } from '../hooks/useCreateExercise';
import { exerciseSchema } from '../schemas/exerciseSchema';

import type { ExerciseDTO } from '@generated/model';


const typeOptions = Object.entries(ExerciseType).map(([key, value]) => ({ label: key, value }));

const CreateExerciseView: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(exerciseSchema),
    mode: 'onTouched',
  });

  // Use ExerciseDTO type for form data
  const { mutate, status, isError, error } = useCreateExercise();
  // Correct loading state for React Query mutation
  const isLoading = status === 'pending';

  const onSubmit = (data: ExerciseDTO) => {
    mutate(
      { data },
      {
        onSuccess: () => navigate('/dashboard/exercises'), // removed state: { created: true }
      }
    );
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const imageUrl = watch('image');

  const breadcrumbItems = [
    { label: 'Exercises', url: '/exercises' },
    { label: 'Create New Exercise' },
  ];

  return (
    <div className="flex flex-column gap-6">
      <BreadCrumb model={breadcrumbItems} className="border-none bg-transparent p-0 text-sm" />
      <div className="flex flex-column gap-2">
        <h1 className="m-0 text-4xl font-bold text-900">Create New Exercise</h1>
        <p className="m-0 text-lg text-600">
          Add a new exercise to the library with detailed instructions.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="surface-card border-round-xl border-1 border-200 shadow-1 overflow-hidden">
          <div className="p-4 md:p-6 flex flex-column gap-6">
            <div className="grid">
              <div className="col-12 md:col-6 flex flex-column gap-2">
                <label className="text-sm font-bold text-700 uppercase">
                  Exercise Name <span className="text-red-500">*</span>
                </label>
                <InputText
                  {...register('name')}
                  placeholder="e.g., Barbell Bench Press"
                  className="p-3 w-full"
                  data-test="exercise-name-input"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>
              <div className="col-12 md:col-6 flex flex-column gap-2">
                <label className="text-sm font-bold text-700 uppercase">
                  Type <span className="text-red-500">*</span>
                </label>
                <Dropdown
                  value={watch('type')}
                  options={typeOptions}
                  onChange={(e) => setValue('type', e.value)}
                  placeholder="Select category"
                  className="p-1 w-full"
                  data-test="exercise-type-dropdown"
                />
                {errors.type && <span className="text-red-500 text-xs">{errors.type.message}</span>}
              </div>
              <div className="col-12 flex flex-column gap-2 mt-3">
                <label className="text-sm font-bold text-700 uppercase">
                  Description <span className="text-red-500">*</span>
                </label>
                <InputTextarea
                  {...register('description')}
                  placeholder="Provide instructions..."
                  rows={4}
                  className="p-3 w-full"
                  data-test="exercise-description-input"
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">{errors.description.message}</span>
                )}
              </div>
              <div className="col-12 mt-4">
                <div className="p-4 md:p-6 border-round-xl border-2 border-dashed border-300 surface-50">
                  <div className="flex flex-column md:flex-row align-items-center gap-6">
                    <div className="w-10rem h-10rem border-round-lg surface-200 flex align-items-center justify-content-center border-1 border-300 relative overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="preview"
                          className="w-full h-full"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <i className="pi pi-image text-4xl text-400"></i>
                      )}
                    </div>
                    <div className="flex-grow-1 w-full flex flex-column gap-4">
                      <h4 className="m-0 text-lg font-bold text-900">Exercise Image</h4>
                      <div className="flex flex-column gap-3">
                        <div className="flex gap-2">
                          <Button
                            label="Upload Image"
                            icon="pi pi-upload"
                            outlined
                            severity="secondary"
                            className="bg-white flex-grow-1"
                            type="button"
                          />
                          <Button
                            label="Use URL"
                            icon="pi pi-link"
                            outlined
                            severity="secondary"
                            className="bg-white flex-grow-1"
                            type="button"
                          />
                        </div>
                        <InputText
                          {...register('image')}
                          onChange={(e) => setValue('image', e.target.value)}
                          placeholder="Paste image URL here..."
                          className="p-2 text-sm w-full"
                          data-test="exercise-image-input"
                        />
                        {errors.image && (
                          <span className="text-red-500 text-xs">{errors.image.message}</span>
                        )}
                        <p className="m-0 text-xs text-500 font-medium">
                          Supported formats: JPG, PNG, WEBP. Max size: 2MB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isError && (
              <div className="text-red-500 text-sm font-bold" data-test="exercise-error">
                {error && typeof error === 'object' && 'message' in error ? (error as { message?: string }).message : 'Failed to create exercise.'}
              </div>
            )}
            {isLoading && (
              <div className="flex align-items-center gap-2" data-test="exercise-loading">
                <i className="pi pi-spin pi-spinner text-2xl text-500" />
                <span>Saving...</span>
              </div>
            )}
            <div className="flex align-items-center justify-content-end gap-3 pt-4 border-top-1 border-200">
              <Button
                label="Cancel"
                onClick={() => navigate('/dashboard/exercises')}
                className="p-button-text p-button-secondary font-bold px-6 py-3"
                type="button"
                data-test="exercise-cancel-btn"
              />
              <Button
                label="Save Exercise"
                icon="pi pi-save"
                className="px-6 py-3 shadow-2"
                type="submit"
                data-test="exercise-save-btn"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateExerciseView;
