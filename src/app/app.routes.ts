import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard],
  },
  //   {
  //     path: 'catalog',
  //     canActivate: [AuthGuard],
  //     children: [
  //       {
  //         path: '',
  //         loadComponent: () => import('./modules/catalog/pages/list/list.page').then(m => m.ListPage),
  //       },
  //       {
  //         path: 'create',
  //         loadComponent: () => import('./modules/catalog/pages/create/create.page').then(m => m.CreatePage),
  //       },
  //       {
  //         path: 'edit/:id',
  //         loadComponent: () => import('./modules/catalog/pages/edit/edit.page').then(m => m.EditPage),
  //       },
  //     ],
  //   },
];
