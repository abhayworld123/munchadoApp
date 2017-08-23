
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
   allOrders: any;

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

      // if (!this.formChanges$Subscription) {
      //    this.formChanges$Subscription = this.cartService.userAddressForm.valueChanges.subscribe(
      //       () => {
      //          this.cartService.userAddressForm
      //       });
      // }

      this.initiate$Subscribe = this.editItemService.updateCart.subscribe(
         () => {
            this.initiate();
         }
      );
      this.initiate();
   }

   public initiate() {
      this.allOrders = this.service.globalCartitems;
      this.totalBillAmount = this.service.globaltotalbill;
   }

   ngOnDestroy() {
      if (this.editItems$Subscriber)
         this.editItems$Subscriber.unsubscribe();
   }

   public placeOrder() {
      let userDetails = this.cartService.userAddressForm.value;
      console.log('placeOrder userDetails: ', userDetails);
      console.log('placeOrder allOrders: ', JSON.stringify(this.allOrders));
      console.log('placeOrder totalBillAmount: ', this.totalBillAmount);
   }

   public isFormValid() {
      if (this.cartService.userAddressForm && this.cartService.userAddressForm.valid) {
         return true;
      }
      return false;
   }
}
