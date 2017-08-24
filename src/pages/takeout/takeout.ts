import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { NavController, ModalController, AlertController } from 'ionic-angular';

import { CartService } from '../../providers/cart/cart.service';
import { LoaderService } from '../../common/loader.service';
import { ServiceClass } from '../../providers/servicee';
import { SupertabssPage } from '../supertabss/supertabss';
import { ToolServices } from '../../common/tool.service';
import { EditItemService } from '../../providers/cart/edit-item.service';
// import * as moment from 'moment';

let DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

@Component({
   selector: 'page-takeout',
   templateUrl: 'takeout.html',
   providers: [LoaderService],
   inputs: ['orderTypeDelivery', 'userForm']
})
export class TakeoutPage {

   fname: FormControl = new FormControl('', Validators.required);
   lname: FormControl = new FormControl('');
   phone: FormControl = new FormControl('');
   email: FormControl = new FormControl('');

   deliveryUserForm: FormGroup;
   userAddressForm: FormGroup;
   formGroupMap: any = {};

   orderType;
   totalBillAmount: number = 0;
   allOrders: any;
   datesList: any[] = [];
   timeSlotes = [];
   selectedDate;
   selectedTime;
   editItemDetails = new EventEmitter();
   initiate$Subscribe;

   constructor(public navCtrl: NavController,
      public modalCtrl: ModalController,
      public viewCtrl: ViewController,
      public service: ServiceClass,
      private cartService: CartService,
      private loaderService: LoaderService,
      private alertController: AlertController,
      private editItemService: EditItemService) {

      this.orderType = 'takeout';
      console.log('takeout constructor');
      this.initiateFormGroupMap();
      this.userAddressForm = new FormGroup(this.formGroupMap);
   }

   private initiateFormGroupMap() {
      this.formGroupMap = {
         fname: this.fname,
         lname: this.lname,
         phone: this.phone,
         email: this.email
      };
   }

   public set userForm(form) {
      console.log('form: ', form);
      this.deliveryUserForm = form;
   }

   public set orderTypeDelivery(value) {
      if (value) {
         this.orderType = value;
         this.initiate();
      }
   }

   public isDateActive(dateString) {
      if (this.selectedDate == dateString) {
         return true;
      }
      return false;
   }

   public get totalBil() {
      return this.totalBillAmount;
   }

   public ngOnInit() {
      this.initiate$Subscribe = this.editItemService.updateCart.subscribe(
         () => {
            this.initiate();
         }
      )
      this.initiate();
      this.cartService.getSelectedDate(this.orderType)
         .then((date) => {
            this.selectedDate = date;
            if (this.selectedDate) {
               this.getTimeSlots(this.selectedDate);
            }
         });
      this.cartService.getSelectedTime(this.orderType)
         .then((time) => {
            console.log('time: ', time, this.orderType);
            this.selectedTime = time;
         });
   }

   public ngOnDestroy() {
      if (this.initiate$Subscribe)
         this.initiate$Subscribe.unsubscribe();
   }

   public initiate() {
      let date = new Date();
      this.datesList = [];
      for (let i = 0; i < 7; i++) {
         this.datesList.push({ date: date.getDate(), dayName: DAYS[date.getDay()], dateString: ToolServices.getDateInString(date).dateString });
         date.setDate(date.getDate() + 1);
      }
      this.allOrders = this.service.globalCartitems;
      this.totalBillAmount = this.service.globaltotalbill;
   }

   public selectTime(selectedTime) {
      console.log('selectedTime: ', selectedTime);
      this.selectedTime = selectedTime;
      this.cartService.setDeliveryTime(this.selectedTime, this.orderType);
   }

   public getTimeSlots(date) {
      this.loaderService.showLoader('Getting Time Slots...')
         .then(
         () => {
            this.selectedTime = undefined;
            this.timeSlotes = [];
            this.cartService.getTimeSlotes(date, this.orderType)
               .then((response) => {
                  if (response && response.data && response.data.timeslots) {
                     this.timeSlotes = ToolServices.getDateAndTimeSlots(response.data.timeslots);
                  }
                  this.selectedDate = date;
                  this.cartService.setDeliveryDate(this.selectedDate, this.orderType);
                  this.loaderService.hideLoader();
               });
         });
   }

   public addMoreitems() {
      this.navCtrl.setRoot(SupertabssPage);
   }

   public editItem($event, item) {
      this.editItemService.editItemsDetails(item);
   }

   public removeAddOnItem($event, item, itemIndex, addOnIndex) {
      $event.stopPropagation();
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
                  this.service.globaltotalbill = this.totalBillAmount;
                  allAddOn.splice(addOnIndex, 1);
                  this.editItemService.updateCartDetails();
               }
            }
         ]
      });
      alert.present();
   }

   public removeMainItem($event, item, itemIndex) {
      $event.stopPropagation();
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
                  this.service.globaltotalbill = this.totalBillAmount;
                  this.service.globalTotalItemSelected -= (item.quantity || 0);
                  this.editItemService.updateCartDetails();
               }
            }
         ]
      });
      alert.present();
   }

   public placeOrder() {
      this.service.userAddressData = this.orderType == 'order' ? this.deliveryUserForm.value : this.userAddressForm.value;
      let orderDetails = this.cartService.getOrderDetails(this.orderType, this.selectedDate, this.selectedTime);
      orderDetails.token = this.service.token;
      console.log('placeOrder orderDetails: ' + JSON.stringify(orderDetails));
   }

   public isFormValid() {
      if (this.orderType == 'takeout' && this.userAddressForm && this.userAddressForm.valid) {
         return true;
      } else if (this.orderType == 'order' && this.deliveryUserForm && this.deliveryUserForm.valid) {
         return true;
      }
      return false;
   }
}
