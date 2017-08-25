import { Injectable } from '@angular/core';

import { ConfigService } from '../../common/config.service';

class User {
   id: string;
   name: string;
   firstName: string;
   lastName: string;
   email: string;
   phoneNumber: string;
   image: string;

   city_id?: string;
   nbd_cities?: string;
   latitude?: string;
   longitude?: string;
   city_name?: string;
   locality?: string;
   state_name?: string;
   state_code?: string;
   country_code?: string;
}

@Injectable()
export class UserService {
   user: User = <User>{};

   public setUser(data, from) {
      if (from == ConfigService.munchadoAPI) {
         this.user = <User>{};
         this.user.firstName = data.first_name;
         this.user.lastName = data.last_name;
         this.user.name = data.first_name + (data.last_name ? ' ' + data.last_name : '');
         this.user.email = data.email;
         this.user.phoneNumber = data.phoneNumber;
         this.user.image = data.profile_image_url;
         this.user.id = data.id;
      } else if (from == ConfigService.firebaseAPI) {
         this.user = <User>{};
         this.user.name = data.displayName;
         let nameArr = data.displayName.split(' ');
         this.user.firstName = nameArr[0];
         this.user.lastName = nameArr[1];
         this.user.email = data.email;
         this.user.phoneNumber = data.phoneNumber;
         this.user.image = data.photoURL;
         this.user.id = data.uid;
      }
   }

   public setAddress(address) {
      if (address) {
         this.user.city_id = address.city_id;
         this.user.nbd_cities = address.nbd_cities;
         this.user.latitude = address.latitude;
         this.user.longitude = address.longitude;
         this.user.city_name = address.city_name;
         this.user.locality = address.locality;
         this.user.state_name = address.state_name;
         this.user.state_code = address.state_code;
         this.user.country_code = address.country_code;
      }
   }
}