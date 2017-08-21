import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CartService {

   constructor(private http: Http) {

   }
   public getTimeSlotes(date) {
      //60462
      return this.http.get('http://api.munchado.in/api/restaurant/timeslots/58285?type=takeout&mob=true&date=' + date + '&token=0c60923ec098f31d592f9f02896d85ed')
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
}