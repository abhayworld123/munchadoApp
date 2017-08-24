import { LoaderService } from './../../common/loader.service';

import { SupertabssPage } from '../../pages/supertabss/supertabss';
import { Observer } from 'rxjs/Observer';
import { AddToCartPage } from '../../pages/addtocard/addtocard';
import { CartPage } from '../../pages/cartpage/cartpage';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';


/**
 * Generated class for the StoryComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
   selector: 'story',
   templateUrl: 'story.html'
})
export class StoryComponent {
   stories: any;
   text: string;

   constructor(public modalCtrl: ModalController,
      public service: ServiceClass,
      public storage: Storage,
      public navCtrl: NavController,
      public navparam: NavParams,
      public viewCtrl: ViewController,
      private LoaderService: LoaderService) {


      console.log('Hello StoryComponent Component');
      this.text = 'Hello World';
   }


   ngOnInit() {
      this.LoaderService.showLoader('Please Wait');

      this.service.getstory(this.service.token)
         .subscribe(story => {
            this.LoaderService.hideLoader();
            this.stories = story.data;

         });

   }

}
