import { foodPage } from './../food/food';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
   selector: 'page-addtocard',
   templateUrl: 'addtocard.html'
})
export class addtocardPage {
   resname: any;
   dishorder: any;
   totalctr: number = 1;
   quant: any;
   baseurl = 'http://dc8l3mwto1qll.cloudfront.net/assets/munch_images/' + "rnymn06237/thumb/";
   sel: any = 0;
   addons: any = [];
   itemId: any;
   selectedAddons: any = {};
   cartarray: Array<any> = [];
   itemsSel = new FormControl();
   itemsCheck = new FormControl();
   addonsGroup: FormGroup;
   updateDetailsForm: FormGroup;
   extraInfo:any;
   // public categories  :  [{name: 'one'}, {name: 'two'}, {name: 'threeve'}];
   public categories: any[] = [{ name: 'one' }, { name: 'two' }, { name: 'threeve' }];

   constructor(public formBuilder: FormBuilder, public service: ServiceClass, public storage: Storage, public navCtrl: NavController, public navparam: NavParams, public viewCtrl: ViewController) {

      console.log(this.navparam.get("dish"));

      // this.resname = this.navparam.get("resname");
      this.dishorder = this.navparam.get("dish");
      this.itemId = this.dishorder.item_id;
      console.log(this.itemId);
      this.quant = 0;
      // this.cartarray.push(34,54,65 ,'dsdsds');  
      this.addonsGroup = new FormGroup({
         itemsSel: this.itemsSel,
         itemsCheck: new FormControl()


      });
   }

   ngOnInit() {
      console.log('onin' + this.itemId);
      this.service.getaddons(this.itemId)
         .subscribe(
         (menuaddons) => {
            // console.log('menuaddons: ' + JSON.stringify(menuaddons));
            if (menuaddons && menuaddons[0] && menuaddons[0].addons) {
               this.addons = <any[]>menuaddons[0].addons;
            } else {
               this.addons = [];
            }
            // console.log(this.addonapi[0]);
            // this.formvalueAdd(this.addonapi);

            //  this.storage.set('menuitems',menuitems.menu)
         },
         (err: any) => {
            console.log('err: ', err);
         }
         );


   }

   public ionSelect(itemName, option) {
      console.log('ion select option: ', option);
      let addon = {};
      addon[option.id] = option;
      this.selectedAddons[itemName] = addon;
   }

   public ionChange(itemName, option, isSelected) {
      console.log('ion change option: ', option, isSelected);
      let addon = {};
      if (this.selectedAddons[itemName]) {
         addon = this.selectedAddons[itemName];
      }
      if (isSelected) {
         addon[option.id] = option;
      } else {
         delete addon[option.id];
      }
      this.selectedAddons[itemName] = addon;
      console.log('this.selectedAddons: ', this.selectedAddons);
   }

   formvalueAdd(addon) {
      let m = addon[0].addons;
      console.log(m);
      m.forEach(element => {
         console.log(element);
      });
   }

   addToOrder(totalctr: number) {

      // console.log((parseInt) dish.prices[0].value);
      let dishes: number = parseFloat(this.dishorder.prices[0].value);
      this.updatestorage(this.totalctr, dishes);
   console.log(this.extraInfo);
      this.dishorder.addOn = this.selectedAddons;
      this.dishorder.extraInfo =  this.extraInfo;
      this.service.globalCartitems.push(this.dishorder);
      this.navCtrl.popTo(foodPage, { ctr: totalctr });

      //  this.navCtrl.setRoot(HomePage , {ctr: totalctr});
   }

   addquantity(dish) {

      this.totalctr += 1;
      // this.updatestorage(this.totalctr);
      this.service.globalCartitems.push(dish);

      console.log(this.service.globalCartitems);
   }

   updatestorage(store, price) {
      this.service.globalVar = this.service.globalVar + store;
      this.service.globaltotalbill = this.service.globaltotalbill + price;

      // this.storage.set('cartcount',store);
   }

   removequantity() {
      this.totalctr -= 1;


   }



   closeModal = () => { this.viewCtrl.dismiss(); };


}
