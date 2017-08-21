import { TakeoutPage } from './../takeout/takeout';
import { DeliveryPage } from './../delivery/delivery';
import { AddToCartPage } from './../addtocard/addtocard';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';
import { EditItemService } from '../../providers/cart/edit-item.service';

@Component({
   selector: 'page-checkouttab',
   templateUrl: 'checkouttab.html',
})
export class checkouttabPage implements OnInit, OnDestroy {

   page1: any = DeliveryPage;
   page2: any = TakeoutPage;
   editItems$Subscriber;
   constructor(public modalCtrl: ModalController,
      public service: ServiceClass,
      public storage: Storage,
      public navCtrl: NavController,
      public navparam: NavParams,
      public viewCtrl: ViewController,
      private editItemService: EditItemService) {

   }

   ngOnInit() {
      this.editItems$Subscriber = this.editItemService.editItems.subscribe(
         (item) => {
            this.navCtrl.push(AddToCartPage, { dish: item, isEdit: true });
         }
      );
   }

   ngOnDestroy() {
      if (this.editItems$Subscriber)
         this.editItems$Subscriber.unsubscribe();
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad SupertabssPage');
   }

   public editItemDetails(item) {
      console.log('editItemDetails: ', item);
   }
}
