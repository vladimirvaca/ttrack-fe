// src/features/dashboard/mocks/dashboardMockData.ts
// Mock data for DashboardView. Move to API integration when backend is ready.

type DashboardStat = {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  sub: string;
};

export type RecentSession = {
  user: string;
  image: string;
  exercise: string;
  status: 'COMPLETED' | 'ACTIVE' | 'SCHEDULED';
  duration: string;
};

export const dashboardStats: DashboardStat[] = [
  {
    label: 'Total Users',
    value: '1,240',
    change: '+12.5%',
    icon: 'pi pi-users',
    color: 'blue',
    sub: 'Since last 30 days',
  },
  {
    label: 'Active Sessions',
    value: '85',
    change: 'Real-time',
    icon: 'pi pi-bolt',
    color: 'orange',
    sub: 'Currently online',
  },
  {
    label: 'Exercises Library',
    value: '450',
    change: '+5 today',
    icon: 'pi pi-bolt',
    color: 'purple',
    sub: 'Total active assets',
  },
];

export const recentSessions: RecentSession[] = [
  {
    user: 'Marcus Doe',
    image: 'https://picsum.photos/seed/marcus/40/40',
    exercise: 'High Intensity Interval',
    status: 'COMPLETED',
    duration: '45m 20s',
  },
  {
    user: 'Sarah Jenkins',
    image: 'https://picsum.photos/seed/sarah/40/40',
    exercise: 'Core Strengthening',
    status: 'ACTIVE',
    duration: '12m 45s',
  },
  {
    user: 'Leon Wu',
    image: 'https://picsum.photos/seed/leon/40/40',
    exercise: 'Power Yoga Flow',
    status: 'SCHEDULED',
    duration: '00m 00s',
  },
];
