
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { TakeoutPage } from './../takeout/takeout';
import { DeliveryPage } from './../delivery/delivery';
import { AddToCartPage } from './../addtocard/addtocard';
import { ServiceClass } from '../../providers/servicee';
import { EditItemService } from '../../providers/cart/edit-item.service';
import { CartService } from '../../providers/cart/cart.service';

@Component({
   selector: 'page-checkouttab',
   templateUrl: 'checkouttab.html',
})
export class checkouttabPage implements OnInit, OnDestroy {

   totalBillAmount: number = 0;
   orderType = 'delivery';

   page1: any = DeliveryPage;
   page2: any = TakeoutPage;

   editItems$Subscriber;
   initiate$Subscribe;
   formChanges$Subscription: Subscription;

   constructor(private modalCtrl: ModalController,
      private service: ServiceClass,
      private cartService: CartService,
      private storage: Storage,
      private navCtrl: NavController,
      private navparam: NavParams,
      private viewCtrl: ViewController,
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
      if (this.editItems$Subscriber) {
         this.editItems$Subscriber.unsubscribe();
      }
   }

   public onTabSelect(ev: any) {
      if (ev.index == 0) {
         this.orderType = 'delivery';
      } else if (ev.index == 1) {
         this.orderType = 'takeout';
      }
      // console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
   }
}
