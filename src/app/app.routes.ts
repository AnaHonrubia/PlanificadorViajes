import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mis-viajes',
    pathMatch: 'full',
  },
  {
    path: 'mis-viajes',
    loadComponent: () => import('./pages/mis-viajes/mis-viajes.page').then( m => m.MisViajesPage)
  },
  {
    path: 'crear-viaje',
    loadComponent: () => import('./pages/crear-viaje/crear-viaje.page').then( m => m.CrearViajePage)
  },
  {
    path: 'detalle-viaje',
    loadComponent: () => import('./pages/detalle-viaje/detalle-viaje.page').then( m => m.DetalleViajePage)
  },
];
