import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';
import { ModalController } from 'ionic-angular';

import { NavController } from 'ionic-angular';

@Component({
   selector: 'page-cartpage',
   templateUrl: 'cartpage.html'
})
export class CartPage {

   allorder: any;
   subtotal: any = 0;
   constructor(public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController, public servicee: ServiceClass) {

   }

   ngOnInit() {

      // this.allorder.forEach(s => this.subtotal += parseFloat('54') );
      this.allorder = this.servicee.globalCartitems;
      console.log('this.allorder: ', this.allorder);

   }

   closeModal() {
      this.viewCtrl.dismiss();
   }

   openMo() {

      let modal = this.modalCtrl.create(Profile);
      modal.present();

   }


}

@Component({
   template: '<div>hello</div>',
})
export class Profile {

   constructor(public viewCtrl: ViewController) {

   }

   dismiss() {
      let data = { 'foo': 'bar' };
      this.viewCtrl.dismiss(data);
   }
}
