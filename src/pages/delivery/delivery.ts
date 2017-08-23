import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { CartService } from '../../providers/cart/cart.service';
import { DatePicker } from '@ionic-native/date-picker';

import { Subscription } from 'rxjs/Subscription';

@Component({
   selector: 'page-delivery',
   templateUrl: 'delivery.html',
})
export class DeliveryPage implements OnInit, OnDestroy {

   fname: FormControl = new FormControl('', Validators.required);
   lname: FormControl = new FormControl('');
   addressNickname: FormControl = new FormControl('', Validators.required);
   address: FormControl = new FormControl('');
   appartment: FormControl = new FormControl('');
   zipcode: FormControl = new FormControl('', Validators.required);
   special: FormControl = new FormControl('');

   phone: FormControl = new FormControl('');
   email: FormControl = new FormControl('');
   // confirm: FormControl = new FormControl('');

   userAddressForm: FormGroup;
   formGroupMap: any = {};

   constructor(private datePicker: DatePicker,
      public navCtrl: NavController,
      public navParams: NavParams,
      private cartService: CartService) {
   }

   public ngOnInit() {
      if (this.cartService.userAddressForm) {
         this.userAddressForm = this.cartService.userAddressForm;
      } else {
         this.initiateFormGroupMap();
         this.userAddressForm = new FormGroup(this.formGroupMap);
         this.cartService.userAddressForm = this.userAddressForm;
      }
   }

   public ngOnDestroy() {
   }

   private initiateFormGroupMap() {
      this.formGroupMap = {
         fname: this.fname,
         lname: this.lname,
         addressNickname: this.addressNickname,
         address: this.address,
         appartment: this.appartment,
         zipcode: this.zipcode,
         special: this.special,
         phone: this.phone,
         email: this.email
         // ,
         // account: new FormGroup({
         //    confirm: this.confirm
         // })
      };
   }
}
