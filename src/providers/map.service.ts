import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observer } from 'rxjs/Observer';
// import * as constants from '../app/app.settings';
import 'rxjs/add/operator/catch';

import { ToolServices } from '../common/tool.service';

@Injectable()
export class MapServiceClass {


   constructor(private _http: Http, private geolocation: Geolocation) {

   }

   getCurrentLocation() {

      return Observable.create(observer => {


         this.geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude

            observer.next(resp.coords);
            // resp.coords.longitude
         }).catch((error) => {
            console.log('Error getting location', error);
            observer.error(error);
         });

      });
   }

   calculateMilesDistance(lat1, lon1, lat2, lon2) {
      // var radlat1 = Math.PI * lat1 / 180;
      // var radlat2 = Math.PI * lat2 / 180;
      // var theta = lon1 - lon2;
      // var radtheta = Math.PI * theta / 180;
      // var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      // dist = Math.acos(dist);
      // dist = dist * 180 / Math.PI;
      // dist = dist * 60 * 1.1515;
      //................................//

      let theta = lon1 - lon2;
      let dist = Math.sin(ToolServices.deg2rad(lat1))
         * Math.sin(ToolServices.deg2rad(lat2))
         + Math.cos(ToolServices.deg2rad(lat1))
         * Math.cos(ToolServices.deg2rad(lat2))
         * Math.cos(ToolServices.deg2rad(theta));
      dist = Math.acos(dist);
      dist = ToolServices.rad2deg(dist);
      dist = dist * 60 * 1.1515;


      // unit = 'M';
      console.log(dist);
      // if (unit=="K") { dist = dist * 1.609344 }
      // if (unit=="N") { dist = dist * 0.8684 }
      return dist;

   }


}


