import { CartService } from './../../providers/cart/cart.service';
import { SupertabssPage } from './../supertabss/supertabss';
import { Observer } from 'rxjs/Observer';
import { AddToCartPage } from './../addtocard/addtocard';
import { CartPage } from './../cartpage/cartpage';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';


/**
 * Generated class for the DinenmorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
   selector: 'payment-page',
   templateUrl: 'payment-page.component.html',
})
export class PaymentPageComponent {

   card: FormControl = new FormControl('', Validators.required);
   name: FormControl = new FormControl('', Validators.required);

   cvv: FormControl = new FormControl('', Validators.required);

   zip: FormControl = new FormControl('', Validators.required);
   exp: FormControl = new FormControl('', Validators.required);
   save: FormControl = new FormControl('', Validators.required);
   cod: FormControl = new FormControl('', Validators.required);


   // confirm: FormControl = new FormControl('');

   paymentForm: FormGroup;
   paymentFormMap: any = {};
   paymentData: any;

   constructor(public navCtrl: NavController, public navParams: NavParams, private cartService: CartService) {

      this.paymentData = navParams.get('orderDetails');

      this.paymentFormMap = {
         name: this.name,
         card: this.card,
         cvv: this.cvv,
         exp: this.exp,
         zip: this.zip,
         save: this.save,
         cod: this.cod
      }
      this.paymentForm = new FormGroup(this.paymentFormMap);
   }
   addCod(param) {
      console.log('add cod param: ', param);
      this.paymentData.cod = param ? 1 : 0;
   }

   makePayment() {
      console.log('this.paymentData: ' + JSON.stringify(this.paymentData));
      this.cartService.placeOrder(this.paymentData);
   }

}
