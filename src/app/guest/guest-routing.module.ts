import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestPage } from './guest.page';

const routes: Routes = [
  {
    path: '',
    component: GuestPage,
    children: [
      {
        path: 'air-conditioner',
        loadChildren: () => import('./air-conditioner/air-conditioner.module').then(m => m.AirConditionerPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'hotel-service',
        loadChildren: () => import('./hotel-service/hotel-service.module').then(m => m.HotelServicePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tv-remote',
        loadChildren: () => import('./tv-remote/tv-remote.module').then(m => m.TvRemotePageModule)
      },
      {
        path: '',
        redirectTo: '/guest/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/guest/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestPageRoutingModule {}
