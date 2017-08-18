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
   baseurl = 'http://dc8l3mwto1qll.cloudfront.net/assets/munch_images/' + "rnymn06237/thumb/";

   resname: any;
   selectedDish: any;
   dishQuantity: number = 1;
   quant: any;
   sel: any = 0;
   addons: any = [];
   itemId: any;
   selectedAddons: any = {};
   cartarray: Array<any> = [];
   updateDetailsForm: FormGroup;
   extraInfo: any;

   // public categories  :  [{name: 'one'}, {name: 'two'}, {name: 'threeve'}];
   public categories: any[] = [{ name: 'one' }, { name: 'two' }, { name: 'threeve' }];

   constructor(public formBuilder: FormBuilder, public service: ServiceClass, public storage: Storage, public navCtrl: NavController, public navparam: NavParams, public viewCtrl: ViewController) {

      console.log(this.navparam.get("dish"));

      // this.resname = this.navparam.get("resname");
      this.selectedDish = JSON.parse(JSON.stringify(this.navparam.get("dish")))
      this.itemId = this.selectedDish.item_id;
      console.log(this.itemId);
      this.quant = 0;
   }

   ngOnInit() {
      console.log('onin' + this.itemId);
      this.service.getaddons(this.itemId)
         .subscribe(
         (menuaddons) => {
            if (menuaddons && menuaddons[0] && menuaddons[0].addons) {
               this.addons = <any[]>menuaddons[0].addons;
            } else {
               this.addons = [];
            }
            console.log('this.addons: ', this.addons);
         },
         (err: any) => {
            console.log('err: ', err);
         }
         );
   }

   public ionSelect(item, option) {
      let addon = {};
      option.addon_id = item.addon_id;
      addon[option.id] = option;
      this.selectedAddons[item.name] = addon;
   }

   public ionChange(item, option, isSelected) {
      let addon = {};
      option.addon_id = item.addon_id;
      if (this.selectedAddons[item.name]) {
         addon = this.selectedAddons[item.name];
      }
      if (isSelected) {
         addon[option.id] = option;
      } else {
         delete addon[option.id];
      }
      this.selectedAddons[item.name] = addon;
      console.log('this.selectedAddons: ', this.selectedAddons);
   }

   public selectedAddOnLength(itemName) {
      let length = 0;
      if (!this.selectedAddons[itemName])
         length = 0;
      else
         length = Object.keys(this.selectedAddons[itemName]).length;
      return length;
   }

   public isAddOnSelected(itemName, addOnId) {
      let isSelected = false;
      if (this.selectedAddons[itemName] && this.selectedAddons[itemName][addOnId]) {
         isSelected = true;
      }
      return isSelected;
   }

   public isAddOnDisabled(item, option) {
      let isDisabled = false;
      if (item.item_limit && !this.isAddOnSelected(item.name, option.id) && this.selectedAddOnLength(item.name) >= item.item_limit) {
         isDisabled = true;
      }
      return isDisabled;
   }

   public addQuantity() {
      this.dishQuantity++;
   }

   public removeQuantity() {
      this.dishQuantity--;
   }

   public addToOrder() {
      let price: number = parseFloat(this.selectedDish.prices[0].value || 0.0);

      this.selectedDish.extraInfo = this.extraInfo;
      this.selectedDish.quantity = this.dishQuantity;
      this.selectedDish.totalAmount = this.dishQuantity * price;

      let addOns = this.getAddOns(this.selectedAddons);
      this.selectedDish.addOns = addOns.addOns;
      this.selectedDish.totalAddOnsAmount = addOns.totalAddOnsBill;

      this.service.globalCartitems.push(this.selectedDish);

      this.updatestorage(this.dishQuantity, price); // price for selected manue and quantity
      this.updatestorage(this.dishQuantity, addOns.totalAddOnsBill); // Add adons bill amount
      this.navCtrl.pop();

   }

   public updatestorage(quantity, price) {
      this.service.globalVar = this.service.globalVar + quantity;
      this.service.globaltotalbill = this.service.globaltotalbill + (quantity * price);
   }

   public getAddOns(selectedAddons) {
      let addOns = [];
      let totalAddOnsBill = 0;
      if (selectedAddons && Object.keys(selectedAddons).length > 0) {
         for (let itemName in selectedAddons) {
            if (selectedAddons && Object.keys(selectedAddons).length > 0) {
               for (let optionId in selectedAddons[itemName]) {
                  addOns.push(selectedAddons[itemName][optionId]);
                  if (!selectedAddons[itemName][optionId].price || isNaN(selectedAddons[itemName][optionId].price)) {
                     selectedAddons[itemName][optionId].price = 0.0;
                  }
                  selectedAddons[itemName][optionId].totalPrice = selectedAddons[itemName][optionId].price * this.dishQuantity;
                  totalAddOnsBill += parseFloat(selectedAddons[itemName][optionId].price);
               }
            }
         }
      }
      return { addOns, totalAddOnsBill };
   }

   public closeModal() {
      this.viewCtrl.dismiss();
   };
}
