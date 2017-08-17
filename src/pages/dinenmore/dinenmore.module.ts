import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DinenmorePage } from './dinenmore';

@NgModule({
  declarations: [
    DinenmorePage,
  ],
  imports: [
    IonicPageModule.forChild(DinenmorePage),
  ],
})
export class DinenmorePageModule {}
