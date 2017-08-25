import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
// import { Subscription } from 'rxjs/Subscription';

import { CartService } from '../../providers/cart/cart.service';
import { UserService } from '../../providers/auth/user.service';

@Component({
   selector: 'page-delivery',
   templateUrl: 'delivery.html',
})
export class DeliveryPage implements OnInit, OnDestroy {

   fname: FormControl;
   lname: FormControl;
   addressNickname: FormControl;
   address: FormControl;
   appartment: FormControl;
   zipcode: FormControl;
   special: FormControl;

   phone: FormControl;
   email: FormControl;

   userAddressForm: FormGroup;
   formGroupMap: any = {};

   constructor(private datePicker: DatePicker,
      public navCtrl: NavController,
      public navParams: NavParams,
      private cartService: CartService,
      private userService: UserService) {

   }

   public ngOnInit() {
      console.log('delivery ngOnInit');
      this.initiateFormGroupMap();
      this.userAddressForm = new FormGroup(this.formGroupMap);
      this.cartService.userAddressForm = this.userAddressForm;
   }

   public ngOnDestroy() {
   }

   private initiateFormGroupMap() {

      this.fname = new FormControl(this.userService.user.firstName, Validators.required);
      this.lname = new FormControl(this.userService.user.lastName);
      this.addressNickname = new FormControl('', Validators.required);
      this.address = new FormControl('');
      this.appartment = new FormControl('');
      this.zipcode = new FormControl('', Validators.required);
      this.special = new FormControl('');

      this.phone = new FormControl(this.userService.user.phoneNumber);
      this.email = new FormControl(this.userService.user.email);

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
      };
   }
}
