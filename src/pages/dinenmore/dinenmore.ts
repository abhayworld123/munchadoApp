import { SupertabssPage } from './../supertabss/supertabss';
import { Observer } from 'rxjs/Observer';
import { AddToCartPage } from './../addtocard/addtocard';
import { CartPage } from './../cartpage/cartpage';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';


/**
 * Generated class for the DinenmorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dinenmore',
  templateUrl: 'dinenmore.html',
})
export class DinenmorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DinenmorePage');
  }

}
