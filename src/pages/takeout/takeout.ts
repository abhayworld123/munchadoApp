import { checkouttabPage } from './../checkouttab/checkouttab';
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
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the TakeoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-takeout',
  templateUrl: 'takeout.html',
})
export class TakeoutPage {

  allorder:any;
  mydate:Date;
  mydate1:any;
  subtotal:any =0 ;


  constructor(public navCtrl: NavController ,public modalCtrl: ModalController, public viewCtrl:ViewController , public servicee:ServiceClass) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeoutPage');
  }

  ngOnInit(){
    this.allorder = this.servicee.globalCartitems;
    console.log(this.allorder);
  
  }

}