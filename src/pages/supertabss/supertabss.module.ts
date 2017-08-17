import { TruncatePipe } from './../../pipes/limitchar.pipe';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupertabssPage } from './supertabss';

@NgModule({
  declarations: [
    SupertabssPage
  ],
  imports: [
    IonicPageModule.forChild(SupertabssPage),
  ],
})
export class SupertabssPageModule {}
