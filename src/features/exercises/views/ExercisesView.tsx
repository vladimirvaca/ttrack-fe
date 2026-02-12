import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useExercises } from '../hooks/useExercises';

import type { ExerciseDTO } from '@generated/model';

const ExercisesView: React.FC = () => {
  const navigate = useNavigate();
  const { exercises, isLoading, isError, error } = useExercises();

  const nameTemplate = (rowData: ExerciseDTO) => {
    return (
      <div>
        <p className="m-0 font-bold text-sm text-900">{rowData.name}</p>
        {/* Optionally display more info if available */}
      </div>
    );
  };

  const typeTemplate = (rowData: ExerciseDTO) => {
    const severities: Record<
      string,
      'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'contrast'
    > = {
      STRENGTH: 'info',
      CARDIO: 'success',
      // 'help' is not allowed, use 'secondary' for FLEXIBILITY
      FLEXIBILITY: 'secondary',
      BALANCE: 'warning',
      HYPERTROPHY: 'info',
      HIIT: 'success',
      PLYOMETRICS: 'warning',
    };
    return (
      <Tag
        value={rowData.type}
        severity={severities[rowData.type]}
        className="text-xs font-bold px-2"
      />
    );
  };

  const previewTemplate = (rowData: ExerciseDTO) => {
    return (
      <Avatar image={rowData.image} size="xlarge" shape="square" className="border-1 border-300" />
    );
  };

  const descriptionTemplate = (rowData: ExerciseDTO) => {
    return <span className="text-500 text-sm">{rowData.description}</span>;
  };

  const actionTemplate = (_rowData: ExerciseDTO) => {
    return (
      <div className="flex gap-2 justify-content-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-plain"
          onClick={() => {
            /* handle edit for _rowData */
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          onClick={() => {
            /* handle delete for _rowData */
          }}
        />
      </div>
    );
  };

  function getErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error && 'message' in error) {
      return (error as { message: string }).message;
    }
    return 'Failed to load exercises.';
  }

  return (
    <div className="flex flex-column gap-6">
      <div className="flex align-items-center justify-content-between">
        <div>
          <h2 className="m-0 text-3xl font-bold">Exercise Management</h2>
          <p className="m-0 mt-1 text-500">
            Manage, edit, and organize the central library of fitness movements.
          </p>
        </div>
        <Button
          label="Create New Exercise"
          icon="pi pi-plus-circle"
          onClick={() => navigate('/dashboard/exercises/create')}
        />
      </div>

      <div className="bg-white border-round-xl border-1 border-200 shadow-1 overflow-hidden">
        {isLoading && (
          <div className="flex justify-content-center align-items-center p-6">
            <ProgressSpinner />
          </div>
        )}
        {isError && (
          <div className="flex justify-content-center align-items-center p-6">
            <Message severity="error" text={getErrorMessage(error)} />
          </div>
        )}
        {!isLoading && !isError && (
          <DataTable value={exercises} className="p-datatable-sm" size="normal">
            <Column header="Preview" body={previewTemplate} headerClassName="text-center" />
            <Column
              field="name"
              header="Exercise Name"
              body={nameTemplate}
            />
            <Column
              field="type"
              header="Type"
              body={typeTemplate}
            />
            <Column
              field="description"
              header="Description"
              body={descriptionTemplate}
              className="text-500 text-sm"
            />
            <Column
              header="Actions"
              body={actionTemplate}
              headerClassName={' flex justify-content-center p-4'}
            />
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default ExercisesView;
