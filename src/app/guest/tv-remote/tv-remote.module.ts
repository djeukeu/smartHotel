import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvRemotePageRoutingModule } from './tv-remote-routing.module';

import { TvRemotePage } from './tv-remote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvRemotePageRoutingModule
  ],
  declarations: [TvRemotePage]
})
export class TvRemotePageModule {}
