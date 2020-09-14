import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirConditionerPageRoutingModule } from './air-conditioner-routing.module';

import { AirConditionerPage } from './air-conditioner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AirConditionerPageRoutingModule
  ],
  declarations: [AirConditionerPage]
})
export class AirConditionerPageModule {}
