import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPageComponent } from './payment-page.component';

@NgModule({
  declarations: [
    PaymentPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPageComponent),
  ],
})
export class PaymentPageModule {}
