import { Routes } from '@angular/router';
import { AdministrationLayoutPage } from './administration-layout.page';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: '',
    component: AdministrationLayoutPage,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadComponent: () => import('./users/list/list.component').then(m => m.ListComponent),
          },
          {
            path: 'create',
            loadComponent: () => import('./users/create/create.component').then(m => m.CreateComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./users/edit/edit.component').then(m => m.EditComponent),
          },
        ],
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            loadComponent: () => import('./clients/list/list.component').then(m => m.ListComponent),
          },
          {
            path: 'create',
            loadComponent: () => import('./clients/create/create.component').then(m => m.CreateComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./clients/edit/edit.component').then(m => m.EditComponent),
          },
        ],
      },
      {
        path: 'providers',
        children: [
          {
            path: '',
            loadComponent: () => import('./providers/list/list.component').then(m => m.ListComponent),
          },
          {
            path: 'create',
            loadComponent: () => import('./providers/create/create.component').then(m => m.CreateComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./providers/edit/edit.component').then(m => m.EditComponent),
          },
        ],
      },
    ],
  },
];
