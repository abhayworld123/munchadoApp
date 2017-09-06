import { SupertabssPage } from './../supertabss/supertabss';
import { ConfigService } from './../../common/config.service';
import { LoaderService } from './../../common/loader.service';
import { ServiceClass } from './../../providers/servicee';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ViewController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
   selector: 'page-SelectRestaurant',
   templateUrl: 'SelectRestaurant.html'
})
export class SelectRestaurantPage {

   gallary: any;
   baseuri: any;
   restraurantList: any;

   constructor(private service: ServiceClass,
      public navparams: NavParams,
      public navCtrl: NavController,
      public http: Http,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      private LoaderService: LoaderService) {


   }

   ngOnInit() {
      this.LoaderService.showLoader('Getting Restaurants');
      this.service.getRestaurants()
         .subscribe(data => {
            this.LoaderService.hideLoader();
            this.restraurantList = data;
            // console.log(this.restraurantList);
         })


   }
   SelectRestaurant(rest) {
      ConfigService.selectedRestaurentId = rest.id;
      this.navCtrl.setRoot(SupertabssPage);
   }



}
