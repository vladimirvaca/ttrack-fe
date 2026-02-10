import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import React from 'react';

import { dashboardStats, recentSessions } from '../mocks/dashboardMockData';

import type { RecentSession } from '../mocks/dashboardMockData';

// User avatar cell renderer
const userTemplate = (rowData: RecentSession) => (
  <div className="flex align-items-center gap-3">
    <Avatar
      image={rowData.image}
      shape="circle"
      size="normal"
      className="border-1 border-200"
    />
    <span className="font-bold text-sm text-800">{rowData.user}</span>
  </div>
);

// Status tag cell renderer
const statusTemplate = (rowData: RecentSession) => {
  const severities: Record<RecentSession['status'], 'success' | 'info' | 'warning'> = {
    COMPLETED: 'success',
    ACTIVE: 'info',
    SCHEDULED: 'warning',
  };
  return (
    <Tag
      value={rowData.status}
      severity={severities[rowData.status]}
      className="text-xs font-bold px-3 border-round-xl"
    />
  );
};

const DashboardView: React.FC = () => {
  return (
    <div className="flex flex-column gap-5">
      {/* Welcome & System Status */}
      <div className="surface-card p-6 border-round-xl border-1 border-200 flex flex-column md:flex-row align-items-center justify-content-between gap-6">
        <div className="flex-1">
          <h2 className="m-0 text-3xl font-bold text-900 tracking-tight">
            Welcome back, Admin! 👋
          </h2>
          <p className="m-0 mt-2 text-lg text-600 line-height-3">
            Everything looks good today. You have{' '}
            <span className="text-primary-600 font-bold">3 pending</span> user approvals.
          </p>
          <div className="flex gap-3 mt-5">
            <Button label="Review Pending" icon="pi pi-user-plus" className="px-4" />
            <Button label="View Reports" severity="secondary" outlined className="px-4 surface-0" />
          </div>
        </div>
        <div className="md:w-22rem w-full">
          <div className="bg-blue-50 border-1 border-blue-100 p-4 border-round-xl">
            <div className="flex align-items-center gap-2 mb-2">
              <i className="pi pi-circle-fill text-green-500 text-xs"></i>
              <span className="font-bold text-sm text-900 uppercase tracking-wide">
                System Status
              </span>
            </div>
            <p className="m-0 text-xs text-700 line-height-3 mb-4">
              Operational - All services responding within 45ms. Last health check: 2m ago.
            </p>
            <Button
              label="View Service Logs"
              size="small"
              outlined
              className="w-full bg-white text-700 font-bold border-1 border-200"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid">
        {dashboardStats.map((stat, i) => (
          <div key={i} className="col-12 md:col-4">
            <div className="surface-card p-4 border-round-xl border-1 border-200 shadow-1 flex flex-column h-full">
              <div className="flex align-items-center justify-content-between mb-4">
                <div
                  className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 border-round-lg border-1 border-${stat.color}-100`}
                >
                  <i className={`${stat.icon} text-2xl`}></i>
                </div>
                <Tag
                  value={stat.change}
                  severity={stat.change.includes('+') ? 'success' : 'info'}
                  className="font-bold px-2 border-round-md"
                />
              </div>
              <p className="m-0 text-500 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="m-0 mt-2 text-4xl font-bold text-900">{stat.value}</h3>
              <p className="m-0 mt-3 text-xs text-500 font-medium">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Sessions Table */}
      <div className="surface-card border-round-xl border-1 border-200 shadow-1 overflow-hidden">
        <div className="p-4 border-bottom-1 border-200 flex align-items-center justify-content-between bg-surface-0">
          <span className="text-xl font-bold text-900">Recent Training Sessions</span>
          <Button
            label="View all sessions"
            size="small"
            className="p-button-link text-primary-600 text-sm font-bold p-0"
          />
        </div>
        <DataTable value={recentSessions} className="p-datatable-sm">
          <Column
            field="user"
            header="User"
            body={userTemplate}
            headerClassName="text-xs uppercase text-500 font-bold px-4"
            className="px-4"
          />
          <Column
            field="exercise"
            header="Exercise"
            headerClassName="text-xs uppercase text-500 font-bold"
            className="text-700 font-medium"
          />
          <Column
            field="status"
            header="Status"
            body={statusTemplate}
            headerClassName="text-xs uppercase text-500 font-bold"
          />
          <Column
            field="duration"
            header="Duration"
            headerClassName="text-xs uppercase text-500 font-bold"
            className="text-500 font-medium"
          />
          <Column
            header="Action"
            headerStyle={{ textAlign: 'right' }}
            bodyStyle={{ textAlign: 'right' }}
            body={() => (
              <Button
                icon="pi pi-ellipsis-h"
                className="p-button-rounded p-button-text p-button-plain text-500"
              />
            )}
            className="px-4"
          />
        </DataTable>
      </div>
    </div>
  );
};

export default DashboardView;
