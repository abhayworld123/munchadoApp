import { LoaderService } from './../../common/loader.service';
import { MapServiceClass } from './../../providers/map.service';
import { TruncatePipe } from './../../pipes/limitchar.pipe';
import { CheckNull } from './../../pipes/CheckNull.pipe';
import { SupertabssPage } from './../supertabss/supertabss';
import { Observer } from 'rxjs/Observer';
import { AddToCartPage } from './../addtocard/addtocard';
import { CartPage } from './../cartpage/cartpage';
import { Component, ViewChild, ContentChildren, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';
import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';
import { EditItemService } from '../../providers/cart/edit-item.service';

declare const google: any;
/**
 * Generated class for the OverviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
   selector: 'page-overview',


   templateUrl: 'overview.html',
})
export class OverviewPage implements AfterViewInit {

   @ViewChild('map') mapElement: any;
   // @ViewChild(SupertabssPage) 
   private childCompSupertabs: SupertabssPage;
   map: any;
   menuoverviewdata: any;
   menudata: any;
   baseurl: any;
   restaurantreviews = [];
   populardishes = [];
   gallary = [];
   typeofplace = [];

   menusubcategories = [];
   categoryitems = [];
   itemprices = [];
   Myslideoptions1: any;
   sliderr: any;
   optionss: any;
   stories: any;
   offsety: any;
   reviews: any;
   d = new Date();
   n = this.d.getDay();
   showMorevar: any = 0;
   mapApi = "AIzaSyDtp2_V1VghnpwAOlnUi6xyVmoSWTVv2YI";
   lat: any = parseFloat("40.7127");
   lng: any = parseFloat("-74.0059");
   currentlat: number;
   currentlng: number;
   zoom: number = 17;
   mapdistance: any = 0;
   constructor(public modalCtrl: ModalController,
      public service: ServiceClass,
      public storage: Storage,
      public navCtrl: NavController,
      public navparam: NavParams,
      public viewCtrl: ViewController,
      private editItemService: EditItemService,
      private MapServiceClass: MapServiceClass,
      private LoaderService: LoaderService) {

   }

   public ngAfterViewInit() {
      // console.log('this.mapElement: ', this.mapElement);
      // this.map = new google.maps.Map(this.mapElement.nativeElement, {
      //    zoom: 14,
      //    center: { lat: 40.7127, lng: -74.0059 }
      // });
      this.getLocation();


   }

   getLocation() {
      this.MapServiceClass.getCurrentLocation().subscribe(currentCord => {
         console.log(currentCord);
         this.currentlat = currentCord.latitude;
         this.currentlng = currentCord.longitude;

         let mapdis = this.MapServiceClass.calculateMilesDistance(this.currentlat, this.currentlng, this.lat, this.lng);
         console.log(mapdis);
         this.mapdistance = mapdis;
      });



   }

   showMore() {
      this.showMorevar = 1;
   }

   showLess() {
      this.showMorevar = 0;
   }

   OnClickPopulardishes(val, ev) {
      console.log('ev:', val);

      this.editItemService.slideToMenu();
      this.editItemService.selectMenuFromOverview(val.menu_id);
      // this.childCompSupertabs.slidetoMenuTab();
   }

   GetDay() {
      if (this.n == 1)
         return "monday";
      else if (this.n == 2)
         return "tuesday";
      else if (this.n == 3)
         return "wednesday";
      else if (this.n == 4)
         return "thursday";
      else if (this.n == 5)
         return "friday";
      else if (this.n == 6)
         return "saturday";
   }
   OperateTime: any;
   GetOperatinghours() {
      this.menuoverviewdata.opening_hours.forEach((element, index) => {

         if (this.n == index) {
            this.OperateTime = element.operation_hrs_ft;
         }
      });
      return this.OperateTime;
   }

   ngOnInit() {
      
      this.LoaderService.showLoader('Please Wait');
      this.service.getmenuoverview(this.service.token)
         .subscribe(menuoverview => {
            this.LoaderService.hideLoader();
            // console.log('menuoverview: ' + JSON.stringify(menuoverview));
            this.menuoverviewdata = menuoverview.data,
               //   this.lat = this.menuoverviewdata.map_data.latitude;
               //   console.log(this.lat);
               //   this.long= this.menuoverviewdata.map_data.longitude; 

               // console.log(menuoverview.data);
               // console.log(this.baseurl + menuoverview.data.cover_image);

               this.menuoverviewdata.restaurant_reviews.forEach(element => {
                  this.restaurantreviews.push(element);
               });

            this.menuoverviewdata.most_popular.forEach(element => {
               this.populardishes.push(element);
            });

            this.menuoverviewdata.galleries.forEach(element => {
               this.gallary.push(element);
            });

            this.menuoverviewdata.type_of_place.forEach(element => {
               this.typeofplace.push(element);
            });
         });
   }
}
