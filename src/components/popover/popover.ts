
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



@Component({
  selector: 'popoverr',
  templateUrl: 'popover.html'
})
export class PopoverrComponent {
  stories:any;
  text: string;

  constructor(public modalCtrl: ModalController, 
   public service: ServiceClass,
    public storage: Storage, 
    public navCtrl: NavController,
     public navparam: NavParams, 
     public viewCtrl: ViewController) {


    console.log('Hello StoryComponent Component');
    this.text = 'Hello World';
  }

}