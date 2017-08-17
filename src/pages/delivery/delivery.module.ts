import { TakeoutPage } from './../takeout/takeout';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryPage } from './delivery';

@NgModule({
  declarations: [
    DeliveryPage,TakeoutPage
  ],
  imports: [
    IonicPageModule.forChild(DeliveryPage),TakeoutPage
  ],
})
export class DeliveryPageModule {}
