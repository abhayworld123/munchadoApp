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
 * Generated class for the ReviewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
   selector: 'page-reviews',
   templateUrl: 'reviews.html',
})
export class ReviewsPage {
   reviews: any;
   stats: any = [];
   constructor(public modalCtrl: ModalController, public service: ServiceClass, public storage: Storage, public navCtrl: NavController, public navparam: NavParams, public viewCtrl: ViewController) {
   }


   ionViewDidLoad() {
      console.log('ionViewDidLoad ReviewsPage');
   }

   ngOnInit() {
      this.service.getreviews(this.service.token)
         .subscribe(reviews => {
            this.reviews = reviews.data;
            
           
            console.log(this.stats);
         })


   }
}