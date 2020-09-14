import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvRemotePage } from './tv-remote.page';

const routes: Routes = [
  {
    path: '',
    component: TvRemotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvRemotePageRoutingModule {}
