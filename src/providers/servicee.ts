import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ConfigService } from '../common/config.service';
// import * as constants from '../app/app.settings';
@Injectable()


export class ServiceClass {
   userAddressData: { fname: string, lname?: string, addressNickname?: string, address: string, appartment?: string, zipcode: string, special?: string, "phone": string, "email": string };
   globalTotalItemSelected: any = 0;
   globalCartitems: Array<any> = [];
   options: any;
   globaltotalbill: any = 0;
   menuoverviewdataglobal: any;
   baseurl: any;
   globalVarUpdate: Observable<number>;
   globalVarObserver: Observer<number>;

   public extractdata: any;
   // public loginInfo: any;
   public cartcount: number = 0;

   constructor(private _http: Http) {
      this.globalVarUpdate = Observable.create((observer: Observer<number>) => {
         this.globalVarObserver.next(this.globalTotalItemSelected);
      });
   }

   gettoken(url: string, param: any): Observable<any> {
      let body = JSON.stringify(param);
      return this._http
         .post(url, body, this.options)
         .catch(this.handleError);
   }

   private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
         error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
   }

   doLogin(url: string, param: any): Observable<any> {
      return this._http
         .post(url, param, this.options)
         .catch(this.handleError);
   }

   doRegister(url: string, param: any): Observable<any> {
      return this._http
         .post(url, param, this.options)
   }

   forgotPass(url: string, param: any): Observable<any> {
      return this._http
         .put(url, param, this.options)
   }

   getmenuitems(): Observable<any> {
      return this._http.get(ConfigService.backendServer + 'restaurant/menu/' + ConfigService.selectedRestaurentId + '?&mob=true&token=' + ConfigService.token)
         .map((response: Response) => <any>response.json())
         .do(data => {
            // console.log(data.menu)
         }).do(ab => 45);
   }

   getstory(): Observable<any> {
      return this._http.get(ConfigService.backendServer + 'restaurant/story/' + ConfigService.selectedRestaurentId + '?&mob=true&token=' + ConfigService.token)
         .map((response: Response) => <any>response.json())
         .do(data => {
            // console.log(data)
         }).do(ab => 45);
   }
   getreviews(): Observable<any> {
      return this._http.get(ConfigService.backendServer + 'restaurant/review/' + ConfigService.selectedRestaurentId + '?&mob=true&page=1&token=' + ConfigService.token)
         .map((response: Response) => <any>response.json())
         .do(data => {
            // console.log(data)
         }).do(ab => 45);
   }

   getmenuoverview(): Observable<any> {
      if (this.menuoverviewdataglobal != 'undefined') {
         return this._http.get(ConfigService.backendServer + 'restaurant/overview/' + ConfigService.selectedRestaurentId + '?mob=true&token=' + ConfigService.token)
            .map((response: Response) => <any>response.json())
            .do(data => {
               // console.log(data)
            }).do(ab => 45);
      }
      else {
         return this.menuoverviewdataglobal;
      }
   }

   getRestaurants() {
      return this._http.get("../assets/restaurant.json")
         .map(res => res.json())
         .do(data => {
            // console.log(data)
         });
   }

   getaddons(itemId): Observable<any> {
      return this._http.get(ConfigService.backendServer + 'restaurant/menu/addons/' + itemId + '&mob=true&?token=' + ConfigService.token)
         .map((response: Response) => {
            try {
               return response.json();
            } catch (err) {
               // console.log('response.text(): ', response.text());
               return [];
            }
         })
   }

    getNetwork() {
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
   return 0;
   });

  
   }

   updateGlobalVar(newValue: any) {
      this.globalTotalItemSelected = newValue;
      this.globalVarObserver.next(this.globalTotalItemSelected);
   }
}


