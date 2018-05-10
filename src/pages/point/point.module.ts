import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointPage } from './point';

@NgModule({
  declarations: [
    PointPage,
  ],
  imports: [
    IonicPageModule.forChild(PointPage),
  ],
})
export class PointPageModule {}
