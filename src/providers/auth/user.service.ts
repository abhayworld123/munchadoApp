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
}