import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePointPage } from './create-point';

@NgModule({
  declarations: [
    CreatePointPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePointPage),
  ],
})
export class CreatePointPageModule {}
