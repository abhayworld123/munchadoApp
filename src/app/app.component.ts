import { SelectCityPage } from './../pages/SelectCity/selectcity.component';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

import { SelectRestaurantPage } from './../pages/SelectRestaurant/SelectRestaurant';
import {
   LocalStorageService, ServiceClass, CartService, UserService, NetworkService
} from './../providers/providers';
import { LoginPage, USER_INFO } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { ConfigService } from '../common/config.service';
import { LoaderService } from '../common/loader.service';


const INTRO_SHOWN = 'introShown';
@Component({
   templateUrl: 'app.html'
})
export class MyApp {
   errorMessage: any;
   rootPage: any;
   body: any;


   constructor(platform: Platform,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen,
      public dataservice: ServiceClass,

      private afAuth: AngularFireAuth,
      public storage: Storage,
      public loader: LoaderService,
      private localStorageService: LocalStorageService,
      private cartService: CartService,
      private userService: UserService,
      private networkService: NetworkService) {

      platform.ready().then(() => {
         this.statusBar.overlaysWebView(true);
         this.statusBar.backgroundColorByHexString('#e09100');

         this.initializeApp();
         this.cartService.getCartItemsFromLocalStorage();
         console.log('network type: ' + this.networkService.getNetworkType());
      });
   }

   private initializeApp() {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let user;

      this.loader.showLoader('Loading...')
         .then(
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
                  return this.localStorageService.getItems(USER_INFO)
               }).then((userInfo) => {
                  // console.log('userInfo, user: ', userInfo, user);
                  if (user || userInfo) {
                     this.rootPage = SelectCityPage;
                     if (user) {
                        this.userService.setUser(user, ConfigService.firebaseAPI)
                     } else if (userInfo) {
                        this.userService.user = userInfo;
                     }
                  } else if (!this.rootPage) {
                     this.rootPage = LoginPage;
                  }
               }).then(() => {
                  this.loader.hideLoader();
               }).catch((error) => {
                  this.errorMessage = <any>error;
               });
         }
         );
   }

   private authenticateUser() {
      return new Promise((resolve, reject) => {
         this.afAuth.authState.subscribe(user => {
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
}

