import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NavController, ModalController, AlertController } from 'ionic-angular';

import { CartService } from '../../providers/cart/cart.service';
import { LoaderService } from '../../common/loader.service';
import { ServiceClass } from '../../providers/servicee';
import { SupertabssPage } from '../supertabss/supertabss';
import { ToolServices } from '../../common/tool.service';
// import * as moment from 'moment';

/**
 * Generated class for the TakeoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

let DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

@Component({
   selector: 'page-takeout',
   templateUrl: 'takeout.html',
})
export class TakeoutPage {

   totalBillAmount: number = 0;
   allOrders: any;
   datesList: any[] = [];
   timeSlotes = [];
   selectedDate;
   selectedTime;

   constructor(public navCtrl: NavController,
      public modalCtrl: ModalController,
      public viewCtrl: ViewController,
      public servicee: ServiceClass,
      private cartService: CartService,
      private loaderService: LoaderService,
      private alertController: AlertController) {

      let date = new Date();
      for (let i = 0; i < 7; i++) {
         this.datesList.push({ date: date.getDate(), dayName: DAYS[date.getDay()], dateString: ToolServices.getDateInString(date).dateString });
         date.setDate(date.getDate() + 1);
      }
   }

   public isDateActive(dateString) {
      if (this.selectedDate == dateString) {
         return true;
      }
      return false;
   }
   public getPrice(amount) {
      if (!amount || isNaN(amount)) {
         amount = 0;
      }
      this.totalBillAmount += amount;
      return amount;
   }

   public get totalBil() {
      return this.totalBillAmount;
   }

   ngOnInit() {
      this.allOrders = this.servicee.globalCartitems;
      this.totalBillAmount = this.servicee.globaltotalbill;

   }



   public getTimeSlots(date) {
      this.loaderService.showLoader('Getting Time Slots...')
         .then(
         () => {
            this.selectedTime = undefined;
            this.timeSlotes = [];
            this.cartService.getTimeSlotes(date)
               .then((response) => {
                  if (response && response.data && response.data.timeslots) {
                     this.timeSlotes = ToolServices.getDateAndTimeSlots(response.data.timeslots);
                  }
                  this.selectedDate = date;
                  this.loaderService.hideLoader();
               });
         });
   }

   public addMoreitems() {
      this.navCtrl.setRoot(SupertabssPage);
   }

   public removeAddOnItem(item, itemIndex, addOnIndex) {
      let alert = this.alertController.create({
         title: 'Confirm',
         message: 'Do you want to remove this addon?',
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               handler: () => {
                  console.log('Cancel clicked');
               }
            },
            {
               text: 'Remove',
               handler: () => {
                  let allAddOn = this.allOrders[itemIndex].addOns;
                  let addOnDetail = allAddOn[addOnIndex];
                  this.totalBillAmount -= addOnDetail.totalPrice ? parseFloat(addOnDetail.totalPrice) : 0;
                  item.totalAddOnsAmount -= addOnDetail.totalPrice ? parseFloat(addOnDetail.totalPrice) : 0;
                  this.servicee.globaltotalbill = this.totalBillAmount;
                  allAddOn.splice(addOnIndex, 1);
               }
            }
         ]
      });
      alert.present();
   }

   public removeMainItem(item, itemIndex) {
      let alert = this.alertController.create({
         title: 'Confirm',
         message: 'Do you want to remove this item?',
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               handler: () => {
                  console.log('Cancel clicked');
               }
            },
            {
               text: 'Remove',
               handler: () => {
                  this.allOrders.splice(itemIndex, 1);
                  this.totalBillAmount -= (item.totalAmount || 0);
                  this.totalBillAmount -= (item.totalAddOnsAmount || 0);
                  this.servicee.globaltotalbill = this.totalBillAmount;
                  this.servicee.globalTotalItemSelected -= (item.quantity || 0);
               }
            }
         ]
      });
      alert.present();
   }
}
