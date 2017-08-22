import { TruncatePipe } from './../pipes/limitchar.pipe';
import { SupertabssPage } from './../pages/supertabss/supertabss';
import { ServiceClass } from './../providers/servicee';
import { foodPage } from './../pages/food/food';
import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { IntroPage } from '../pages/intro/intro';
// import {TabsPage} from '../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';

import { Storage } from '@ionic/storage';

@Component({

   templateUrl: 'app.html'

})
export class MyApp {
   errorMessage: any;
   rootPage: any;
   loader: any;
   body:any;


   constructor(platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, public dataservice: ServiceClass,
      private afAuth: AngularFireAuth, public storage: Storage, public loadingCtrl: LoadingController) {



      platform.ready().then(() => {
         // this.presentLoading();
         this.initializeApp();

      });
   }

   private initializeApp() {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.loader = this.loadingCtrl.create({ content: 'Loading...' })
      this.loader.present().then(
         () => {
            this.storage.get('introShown').then((result) => {
               console.log('introShown result: ', result);
               if (result) {
                  console.log('introShown result: ', (typeof result));
                  // this.rootPage = LoginPage;
                  return this.authenticateUser();
               } else {
                  console.log('introShown else part ');
                  this.rootPage = IntroPage;
                  this.storage.set('introShown', true);
               }

            }).then((user) => {
               if (user) {
                  this.rootPage = SupertabssPage;
               } else if (!this.rootPage) {
                  this.rootPage = LoginPage;
               }
            }).then(() => {
               return this.getToken();
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
            .gettoken('http://api.munchado.in/api/auth/token', this.body)
            .subscribe(
            result => {
               result = JSON.parse(result._body);
               this.dataservice.token = result.token; console.log(result);
               resolve();
               // this.token =  this.dataservice.token;
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

