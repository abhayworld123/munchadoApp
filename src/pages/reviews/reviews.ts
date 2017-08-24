import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';

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
      this.service.getreviews()
         .subscribe(reviews => {
            this.reviews = reviews.data;
            console.log(this.stats);
         })
   }
}