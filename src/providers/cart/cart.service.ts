import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup } from '@angular/forms';

import { LocalStorageService } from '../localstorage.service';
import { ServiceClass } from '../../providers/servicee';
import { EditItemService } from './edit-item.service';
import { ConfigService } from '../../common/config.service';

const CART_ITEMS = 'CART_ITEMS'
const TOTAL_CART_ITEMS = 'TOTAL_CART_ITEMS'
const TOTAL_BILL_AMOUNT = 'TOTAL_BILL_AMOUNT'
const SELECTED_DATE = 'SELECTED_DATE'
const SELECTED_TIME = 'SELECTED_TIME'
@Injectable()
export class CartService {
   userAddressForm: FormGroup;

   constructor(private http: Http,
      private localStorageService: LocalStorageService,
      private service: ServiceClass,
      private editItemService: EditItemService) {

   }

   public setDeliveryDate(date, orderType) {
      this.localStorageService.setItems(orderType + SELECTED_DATE, date);
   }

   public setDeliveryTime(time, orderType) {
      this.localStorageService.setItems(orderType + SELECTED_TIME, time);
   }

   public getTimeSlotes(date, type) {
      return this.http.get(ConfigService.backendServer + 'restaurant/timeslots/' + ConfigService.selectedRestaurentId + '?type=' + type + '&mob=true&date=' + date + '&token=0c60923ec098f31d592f9f02896d85ed')
         .toPromise()
         .then((response) => {
            try {
               return response.json();
            } catch (err) {
               return {};
            }
            // console.log('tome slots response: ', response);
         })
   }

   public setCartItemsToLocalStorage() {
      this.localStorageService.setItems(CART_ITEMS, this.service.globalCartitems);
      this.localStorageService.setItems(TOTAL_CART_ITEMS, this.service.globalTotalItemSelected);
      this.localStorageService.setItems(TOTAL_BILL_AMOUNT, this.service.globaltotalbill);
   }

   public getCartItemsFromLocalStorage() {
      this.localStorageService.getItems(CART_ITEMS)
         .then((data) => {
            if (data)
               this.service.globalCartitems = data;
         });
      this.localStorageService.getItems(TOTAL_CART_ITEMS)
         .then((data) => {
            if (data)
               this.service.globalTotalItemSelected = data;
         });
      this.localStorageService.getItems(TOTAL_BILL_AMOUNT)
         .then((data) => {
            if (data)
               this.service.globaltotalbill = data;
         });
   }

   public getSelectedDate(orderType) {
      return this.localStorageService.getItems(orderType + SELECTED_DATE)
         .then((data) => {
            return data;
         });
   }

   public getSelectedTime(orderType) {
      return this.localStorageService.getItems(orderType + SELECTED_TIME)
         .then((data) => {
            return data;
         });
   }

   public clearCart() {
      this.localStorageService.removeItems(CART_ITEMS);
      this.localStorageService.removeItems(TOTAL_CART_ITEMS);
      this.localStorageService.removeItems(TOTAL_BILL_AMOUNT);
   }

   public getOrderDetails(orderType, date, time) {
      let userDetails = this.service.userAddressData;
      let allOrders: any = this.service.globalCartitems;
      // let totalBillAmount: number = this.service.globaltotalbill;
      // console.log('placeOrder userDetails: ', userDetails);
      // console.log('placeOrder allOrders: ', JSON.stringify(allOrders));
      // console.log('placeOrder totalBillAmount: ', totalBillAmount);
      let items = [];
      if (allOrders && allOrders.length > 0) {
         for (let i = 0; i < allOrders.length; i++) {
            let obj = allOrders[i];
            let adons = [];
            if (obj.quantity.addOns && obj.quantity.addOns.length > 0) {
               for (let j = 0; j < obj.quantity.addOns.length; j++) {
                  let addonObj = obj.quantity.addOns[i];
                  adons.push({
                     optionId: addonObj.addon_id,
                     priority: 1
                  })
               }
            }
            items.push({
               quantity: obj.quantity,
               id: 0,
               price_id: obj.prices[0].id,
               item_id: obj.item_id,
               special_instruction: obj.extraInfo || '',
               addons: adons
            });
         }
      } else {
         return null;
      }
      let placeOrder: any = {};
      placeOrder.user_details = userDetails;
      placeOrder.order_details = {
         order_type: orderType == 'order' ? 'delivery' : 'takeout',
         tax: '0.0',
         delivery_address: userDetails.address + ', ' + userDetails.appartment + ', ' + userDetails.zipcode,
         special_instruction: userDetails.special,
         restaurant_id: this.service.restcode,
         delivery_date: date,
         delivery_time: time,
         tip_percent: null,
         order_type1: 'I',
         order_type2: 'p',
         email: userDetails.email,
         items: items
      };

      placeOrder.card_details = {}; // atleast blank object, can not have blank
      return placeOrder;
   }

   public placeOrder(params) {
      let url = ConfigService.backendServer + 'user/orderplace?mob=true';
      let body = params;
      this.http.post(url, body)
         .toPromise()
         .then(
         (response) => {
            console.log('placeOrder response: ', response);
         })
         .catch((error) => {
            console.log('placeOrder error: ', error);
         });
   }
}