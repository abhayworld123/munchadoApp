import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

import { SelectRestaurantPage } from './../pages/SelectRestaurant/SelectRestaurant';
import { LocalStorageService } from './../providers/localstorage.service';
import { ServiceClass } from './../providers/servicee';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { CartService } from '../providers/cart/cart.service';
import { ConfigService } from '../common/config.service';

const INTRO_SHOWN = 'introShown';
@Component({

   templateUrl: 'app.html'

})
export class MyApp {
   errorMessage: any;
   rootPage: any;
   loader: any;
   userInfo: any;
   body: any;


   constructor(platform: Platform,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen,
      public dataservice: ServiceClass,

      private afAuth: AngularFireAuth,
      public storage: Storage,
      public loadingCtrl: LoadingController,
      private localStorageService: LocalStorageService,
      private cartService: CartService) {

      platform.ready().then(() => {
         // this.presentLoading();
         this.statusBar.overlaysWebView(true);
         this.statusBar.backgroundColorByHexString('#e09100');

         this.initializeApp();
         this.cartService.getCartItemsFromLocalStorage();
      });
   }

   private initializeApp() {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let user;

      this.loader = this.loadingCtrl.create({ content: 'Loading...' })
      this.loader.present().then(
         () => {
            this.getToken()
               .then(
               () => {
                  return this.localStorageService.getItems(INTRO_SHOWN);
               })
               .then((result) => {
                  if (result) {
                     return this.authenticateUser();
                  } else {
                     this.rootPage = IntroPage;
                     this.localStorageService.setItems(INTRO_SHOWN, true);
                  }
               }).then((userData) => {
                  user = userData;
                  return this.localStorageService.getItems('userInfo')
               }).then((userInfo) => {
                  // this.userInfo = data;
                  console.log('userInfo, user: ', userInfo, user);

                  if (user || userInfo) {
                     this.rootPage = SelectRestaurantPage;
                     this.dataservice.loginInfo = userInfo;
                  } else if (!this.rootPage) {
                     this.rootPage = LoginPage;
                  }
               }).then(() => {
                  this.loader.dismiss();
               }).catch((error) => {
                  this.errorMessage = <any>error;
               });
         }
      );
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

   }

   private authenticateUser() {
      return new Promise((resolve, reject) => {
         this.afAuth.authState.subscribe(user => {
            //  this.presentLoading();
            resolve(user);
         },
            err => {
               reject(err);
            });
      });
   }


   private getToken() {
      return new Promise((resolve, reject) => {
         this.dataservice
            .gettoken(ConfigService.backendServer + 'auth/token', this.body)
            .subscribe(
            result => {
               result = JSON.parse(result._body);
               ConfigService.token = result.token;
               resolve();
            },
            error => {
               reject(error);
            }
            );
      })

   }

   presentLoading() {

      this.loader = this.loadingCtrl.create({
         content: "Authenticating..."
      });

      this.loader.present();


   }

}

