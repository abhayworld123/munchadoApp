import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { StoryComponent } from './story';

@NgModule({
  declarations: [
    StoryComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    StoryComponent
  ]
})
export class StoryComponentModule {}
