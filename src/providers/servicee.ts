import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observer } from 'rxjs/Observer';
// import * as constants from '../app/app.settings';
import 'rxjs/add/operator/catch';
@Injectable()


export class ServiceClass {

   globalTotalItemSelected: any = 0;
   globalCartitems: Array<any> = [];
   options: any;
   globaltotalbill: any = 0;
   menuoverviewdataglobal: any;
   restcode: any;
   baseurl :any;
   globalVarUpdate: Observable<number>;
   globalVarObserver: Observer<number>;

   public token: any;
   public token2: any;
   public extractdata: any;
   public loginInfo :any; 
   public cartcount: number = 0;
   // private _producturl= constants.API_URL + 'userlist'; 
   constructor(private _http: Http) {
      this.restcode = 67288;
      // this.token='312839b3cdc263cd447566859238db60'; 

      this.token2 = 'e553cd7d793b2b4f38e49762b9700fec';

      this.globalVarUpdate = Observable.create((observer: Observer<number>) => {
         this.globalVarObserver.next(this.globalTotalItemSelected);

      });

   }
   //     getproducts(): Observable<any> {
   //       return this._http.get(this._producturl,{ withCredentials: false }) 
   //       .map((response: Response) => <any> response.json());
   //    }




   gettoken(url: string, param: any): Observable<any> {
      console.log(url);

      let body = JSON.stringify(param);
      //  console.log(url);
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
      console.log(param);
      // let body = JSON.stringify(param);
      //  console.log(url);
      return this._http
         .post(url, param, this.options)
         .catch(this.handleError);
    }

    doRegister(url:string , param:any): Observable<any>{
      console.log(param);
      return this._http
         .post(url, param, this.options)
        

    }
    
    forgotPass(url:string , param:any):Observable<any>{
       console.log(param);
      return this._http
       .put(url, param , this.options)
    }



   getmenuitems(token): Observable<any> {


      console.log();
      return this._http.get('http://api.munchado.in/api/restaurant/menu/' + this.restcode + '?&mob=true&token=' + token)
         .map((response: Response) => <any>response.json())
         .do(data => console.log(data.menu)).do(ab => 45);





   } 





   getstory(token): Observable<any> {


      console.log();
      return this._http.get('http://api.munchado.in/api/restaurant/story/' + this.restcode + '?&mob=true&token=' + this.token)
         .map((response: Response) => <any>response.json())
         .do(data => console.log(data)).do(ab => 45);


   }
   getreviews(token): Observable<any> {


      console.log();
      return this._http.get('http://api.munchado.in/api/restaurant/review/' + this.restcode + '?&mob=true&page=1&token=' + this.token)
         .map((response: Response) => <any>response.json())
         .do(data => console.log(data)).do(ab => 45);


   }






   getmenuoverview(token): Observable<any> {

      if (this.menuoverviewdataglobal != 'undefined') {
         console.log('im  in if ');
         return this._http.get('http://api.munchado.in/api/restaurant/overview/' + this.restcode + '?mob=true&token=' + token)
            .map((response: Response) => <any>response.json())
            .do(data => console.log(data)).do(ab => 45);

      }
      else {
         console.log('im in else');
         return this.menuoverviewdataglobal;
      }



   }

   // http://api.munchado.in/api/restaurant/menu/addons/<item_id>?mob=true&token=8555c580eecb7fdd2cda4ddbd30e3bda
   getaddons(itemId): Observable<any> {

      return this._http.get('http://api.munchado.in/api/restaurant/menu/addons/' + itemId + '&mob=true&?token=' + this.token)
         
         .map((response: Response) => {
            // console.log('add on response: ', response);
            try {
               return response.json();
            } catch (err) {
               console.log('response.text(): ', response.text());
               return [];
            }
         })
         

         // .do(data => console.log(data))
      // .catch((err:any) => {
      //    return err;
      // })

   }



   updateGlobalVar(newValue: any) {
      this.globalTotalItemSelected = newValue;
      this.globalVarObserver.next(this.globalTotalItemSelected);
   }



}


