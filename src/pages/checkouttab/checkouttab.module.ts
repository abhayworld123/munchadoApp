import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { checkouttabPage } from './checkouttab';

@NgModule({
  declarations: [
    checkouttabPage,
  ],
  imports: [
    IonicPageModule.forChild(checkouttabPage),
  ],
})
export class checkouttabPageModule {}
