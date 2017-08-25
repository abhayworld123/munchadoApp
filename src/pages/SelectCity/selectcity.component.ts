import { SelectRestaurantPage } from './../SelectRestaurant/SelectRestaurant';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ViewController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { USER_INFO } from './../login/login';
import { LocalStorageService } from './../../providers/localstorage.service';
import { SupertabssPage } from './../supertabss/supertabss';
import { ConfigService } from './../../common/config.service';
import { LoaderService } from './../../common/loader.service';
import { ServiceClass } from './../../providers/servicee';
import { UserService } from './../../providers/auth/user.service';

@Component({
   selector: 'SelectyCity',
   templateUrl: 'selectcity.html'
})
export class SelectCityPage {
   cityStatesData: any;
   state;
   cities;
   params: any;
   selectedCity: any;

   constructor(private service: ServiceClass,
      public navparams: NavParams,
      public navCtrl: NavController,
      public http: Http,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      private LoaderService: LoaderService,
      private localStorageService: LocalStorageService,
      private userService: UserService) {


   }




   ngOnInit() {
      this.getCities();

   }

   selectState() {
      this.cities = undefined;
      if (this.state)
         this.cities = this.state.cities;
   }

   getCities() {
      this.service.getCities().subscribe(data => {
         this.cityStatesData = data.data;
         console.log('this.cityStatesData: ', this.cityStatesData);
      })
   }

   mapCityToToken() {
      if (!this.selectedCity) {
         alert('Please select city first.');
         return;
      }
      this.params = {
         "token": ConfigService.token,
         "city_id": this.selectedCity.city_id
      };

      this.service
         .mapCityToken(this.params)
         .subscribe(data => {
            if (data && data.data && data.data.selected_location) {
               console.log('user city address: ', data);
               data = data.data.selected_location;
               this.userService.setAddress(data);
               this.localStorageService.setItems(USER_INFO, this.userService.user);
               this.localStorageService.setItems('city_id', this.selectedCity.city_id);
               this.navCtrl.setRoot(SelectRestaurantPage);
            }
         })
   }
}
