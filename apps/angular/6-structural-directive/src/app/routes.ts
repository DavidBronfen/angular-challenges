import { canMatch } from './guards/can-match.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch([])],
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch(['MANAGER'])],
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch(['READER', 'WRITER'])],
    loadComponent: () => import('./dashboard/reader-and-writer.component'),
  },
  {
    path: 'enter',
    canMatch: [() => canMatch(['CLIENT'])],
    loadComponent: () => import('./dashboard/client.component'),
  },
  {
    path: 'enter',
    loadComponent: () => import('./dashboard/everyone.component'),
  },
];
