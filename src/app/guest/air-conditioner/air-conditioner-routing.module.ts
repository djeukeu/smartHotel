import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirConditionerPage } from './air-conditioner.page';

const routes: Routes = [
  {
    path: '',
    component: AirConditionerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirConditionerPageRoutingModule {}
