import { TakeoutPage } from './../takeout/takeout';
import { DeliveryPage } from './../delivery/delivery';
import { StoryComponent } from './../../components/story/story';
import { DinenmorePage } from './../dinenmore/dinenmore';
import { ReviewsPage } from './../reviews/reviews';
import { MenuPage } from './../menu/menu';
import { OverviewPage } from './../overview/overview';
import { Observer } from 'rxjs/Observer';
import { addtocardPage } from './../addtocard/addtocard';
import { CartPage } from './../cartpage/cartpage';
import { foodPage } from './../food/food';

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';






/**
 * Generated class for the SupertabssPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-checkouttab',
  templateUrl: 'checkouttab.html',
})
export class checkouttabPage {

   page1: any = DeliveryPage;
  page2: any = TakeoutPage;
  


  constructor(public modalCtrl: ModalController, public service: ServiceClass, public storage: Storage, public navCtrl: NavController, public navparam: NavParams, public viewCtrl: ViewController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupertabssPage');
  }

      





  


  

}
