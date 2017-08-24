import { LocalStorageService } from './../../providers/localstorage.service';
import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../../providers/auth/auth';
import { GallaryPage } from './../gallary/gallary';
import { checkouttabPage } from './../checkouttab/checkouttab';
import { StoryComponent } from './../../components/story/story';
import { DinenmorePage } from './../dinenmore/dinenmore';
import { ReviewsPage } from './../reviews/reviews';
import { MenuPage } from './../menu/menu';
import { OverviewPage } from './../overview/overview';
import { Observer } from 'rxjs/Observer';
import { AddToCartPage } from './../addtocard/addtocard';
import { CartPage } from './../cartpage/cartpage';
import { foodPage } from './../food/food';
import { SuperTabsModule, SuperTabs } from 'ionic2-super-tabs';


import { Component, ViewChild, AfterViewInit, ContentChild } from '@angular/core';
import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';
import { EditItemService } from '../../providers/cart/edit-item.service';

/**
 * Generated class for the SupertabssPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
   selector: 'page-supertabss',
   templateUrl: 'supertabss.html',
})
export class SupertabssPage {
   @ViewChild(Content) content: Content;
   @ViewChild(SuperTabs) superTabs: SuperTabs;


   menuoverviewdata: any;
   menudata: any;
   baseurl: any;
   BaseUrl: any;
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



   abc: any = 1;

   page1: any = OverviewPage;
   page2: any = MenuPage;
   page3: any = StoryComponent;
   page4: any = ReviewsPage;
   page5: any = DinenmorePage;
   page6: any = foodPage;
   activateTabIndex;

   constructor(public modalCtrl: ModalController,
      public service: ServiceClass,
      public storage: Storage,
      public navCtrl: NavController,
      public navparam: NavParams,
      public viewCtrl: ViewController,
      private editItemService: EditItemService,
      public afAuth: AngularFireAuth,
      private localStorageService: LocalStorageService) {
      this.activateTabIndex = 0;

   }

   onTabSelect($event) {
      // console.log($event)
      this.activateTabIndex = $event.index;
   }
   LogoutApp() {
      if (this.afAuth.auth.currentUser) {
         this.afAuth.auth.signOut();
         this.navCtrl.setRoot(LoginPage);
      }
      else {

         //  this.navCtrl.rootNav.setRoot(LoginPage);
         this.afAuth.auth.signOut();
         this.localStorageService.removeItems('userInfo');
         this.navCtrl.setRoot(LoginPage);
         alert(3);
      }
   }

   openGallery(gallary) {
      let mymodal = this.modalCtrl.create(GallaryPage, { galaryitems: gallary, baseurl: this.BaseUrl })
      mymodal.present();
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad SupertabssPage');

   }

   openCheckout = () => {
      // this.navCtrl.push(CartPage)
      this.navCtrl.push(checkouttabPage)

   }

   slidetoMenuTab = () => {
      this.superTabs.slideTo(1);
   }


   ngOnInit() {

      this.editItemService.slideToMenuPage.subscribe(
         () => {
            this.slidetoMenuTab();
         }
      );

      this.Myslideoptions1 = {
         pager: true,
         slidesPerView: 3,
         freemode: true
      };



      // this.baseurl = 'http://dc8l3mwto1qll.cloudfront.net/assets/munch_images/' + "rnymn06237/thumb/";

      this.service.getmenuoverview(this.service.token)
         .subscribe(menuoverview => {
            this.service.menuoverviewdataglobal = menuoverview;
            this.BaseUrl = menuoverview.base_url + 'munch_images/' + menuoverview.data.rest_code + '/';
            this.service.baseurl = menuoverview.base_url + 'munch_images/' + menuoverview.data.rest_code + '/thumb/';
            console.log(this.service.baseurl);
            this.menuoverviewdata = menuoverview.data,
               console.log(menuoverview.data), console.log(this.baseurl + menuoverview.data.cover_image)

               , this.menuoverviewdata.restaurant_reviews.forEach(element => {

                  this.restaurantreviews.push(element);

               }),

               this.menuoverviewdata.most_popular.forEach(element => {

                  this.populardishes.push(element);



               }),
               this.menuoverviewdata.galleries.forEach(element => {

                  this.gallary.push(element);

               }),
               this.menuoverviewdata.type_of_place.forEach(element => {

                  this.typeofplace.push(element);


               });









         }
         );








   }

}
