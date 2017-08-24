import { LoaderService } from './../../common/loader.service';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { EditItemService } from '../../providers/cart/edit-item.service';

@Component({
   selector: 'page-addtocard',
   templateUrl: 'addtocard.html'
})
export class AddToCartPage {
   baseurl = 'http://dc8l3mwto1qll.cloudfront.net/assets/munch_images/' + "rnymn06237/thumb/";

   title: string = 'Add To Cart';
   resname: any;
   isEditMode: boolean = false;
   selectedDish: any;
   dishQuantity: number = 1;
   sel: any = 0;
   addons: any = [];
   itemId: any;
   selectedAddons: any = {};
   cartarray: Array<any> = [];
   updateDetailsForm: FormGroup;
   extraInfo: any;

   // edit mode
   editTotalAmount = 0;
   editTotalAddOnsAmount = 0;
   editQuantity = 0;

   // public categories  :  [{name: 'one'}, {name: 'two'}, {name: 'threeve'}];
   public categories: any[] = [{ name: 'one' }, { name: 'two' }, { name: 'threeve' }];

   constructor(public formBuilder: FormBuilder,
      public service: ServiceClass,
      public storage: Storage,
      public navCtrl: NavController,
      public navparam: NavParams,
      public viewCtrl: ViewController,
      private editItemService: EditItemService,
       private LoaderService : LoaderService) {

      // this.resname = this.navparam.get("resname");
      this.selectedDish = JSON.parse(JSON.stringify(this.navparam.get('dish')))
      this.isEditMode = this.navparam.get('isEdit');
      this.itemId = this.selectedDish.item_id;
      this.dishQuantity = this.selectedDish.quantity || 1;
      this.selectedAddons = this.selectedDish.selectedAddons || {};
      if (this.isEditMode) {
         this.title = 'Update Item';
         this.editTotalAmount = this.selectedDish.totalAmount;
         this.editTotalAddOnsAmount = this.selectedDish.totalAddOnsAmount;
         this.editQuantity = this.selectedDish.quantity;
      }
   }

   ngOnInit() {
      this.LoaderService.showLoader('Please Wait');
      this.service.getaddons(this.itemId)
         .subscribe(
         (menuaddons) => {
            this.LoaderService.hideLoader();
            if (menuaddons && menuaddons[0] && menuaddons[0].addons) {
               this.addons = <any[]>menuaddons[0].addons;
            } else {
               this.addons = [];
            }
            for (let i = 0; i < this.addons.length; i++) {
               let obj = this.addons[i];
               let options = obj.options;
               let selectedAddOnOption = this.selectedAddons[obj.name];
               for (let j = 0; j < options.length; j++) {
                  let optionObj = options[j];
                  if (selectedAddOnOption && selectedAddOnOption[optionObj.id]) {
                     optionObj.checked = true;
                  } else {
                     optionObj.checked = false;
                  }
               }
            }
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
      // console.log('this.selectedAddons: ', this.selectedAddons);
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

   public updateOrder() {

      this.updatestorage(-1, this.editTotalAmount);
      this.updatestorage(-1, this.editTotalAddOnsAmount);
      this.updateTotalCount((-1 * this.editQuantity));
      this.addToOrder(true);
      this.editItemService.updateCartDetails();
   }

   public addToOrder(isEdit) {
      let price: number = parseFloat(this.selectedDish.prices[0].value || 0.0);

      this.selectedDish.extraInfo = this.extraInfo;
      this.selectedDish.quantity = this.dishQuantity;
      this.selectedDish.totalAmount = this.dishQuantity * price;

      let addOns = this.getAddOns(this.selectedAddons);
      this.selectedDish.addOns = addOns.addOns;
      this.selectedDish.selectedAddons = this.selectedAddons;
      this.selectedDish.totalAddOnsAmount = addOns.totalAddOnsBill * this.dishQuantity;

      if (!isEdit) {
         this.selectedDish.itemIndex = this.service.globalCartitems.length;
         this.service.globalCartitems.push(this.selectedDish);
      } else {
         this.service.globalCartitems[this.selectedDish.itemIndex] = this.selectedDish;
      }

      this.updateTotalCount(this.dishQuantity);
      this.updatestorage(this.dishQuantity, price); // price for selected manue and quantity
      this.updatestorage(this.dishQuantity, addOns.totalAddOnsBill); // Add adons bill amount
      this.navCtrl.pop();

   }

   public updatestorage(quantity, price) {
      let amount = quantity * price;
      this.service.globaltotalbill = this.service.globaltotalbill + amount;
   }

   public updateTotalCount(quantity) {
      this.service.globalTotalItemSelected = this.service.globalTotalItemSelected + quantity;
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
