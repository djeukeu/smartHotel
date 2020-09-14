import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'new-room',
    loadChildren: () => import('./new-room/new-room.module').then(m => m.NewRoomPageModule)
  },
  {
    path: 'edit/:roomId',
    loadChildren: () => import('./edit-room/edit-room.module').then(m => m.EditRoomPageModule)
  },
  {
    path: ':roomId',
    loadChildren: () => import('./room-detail/room-detail.module').then( m => m.RoomDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
