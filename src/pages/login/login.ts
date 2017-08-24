import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { SelectRestaurantPage } from './../SelectRestaurant/SelectRestaurant';
import { LoaderService } from './../../common/loader.service';
import { ConfigService } from '../../common/config.service';
import { LocalStorageService } from './../../providers/localstorage.service';
import { ServiceClass } from './../../providers/servicee';
import { ForgotPage } from './../forgot/forgot';
import { RegisterPage } from './../register/register';
import { AuthProvider } from './../../providers/auth/auth';
import firebase from 'firebase';


@IonicPage()
@Component({
   selector: 'page-login',
   templateUrl: 'login.html',
})
export class LoginPage {
   body: any;
   loginUname: any;
   loginPassword: any;
   params: any;
   userProfile: any;
   wrongcred: any = 0;
   loader: any;
   private loginGrp: FormGroup;

   uName: FormControl;
   pass: FormControl;



   constructor(private formBuilder: FormBuilder, private loaderCtrl: LoadingController, public service: ServiceClass, public navCtrl: NavController, public navParams: NavParams,
      public authProvider: AuthProvider, private localStorageService: LocalStorageService
      , private LoaderService: LoaderService) {


      firebase.auth().onAuthStateChanged(user => {
         if (user) {

            console.log(user);
            this.userProfile = user;
         } else {
            console.log("There's no user here");
         }
      });

      this.uName = new FormControl('', Validators.required);
      this.pass = new FormControl('', [Validators.required]);
      this.loginGrp = this.formBuilder.group({
         uName: this.uName,
         pass: this.pass,
      });

   }

   getLoginInfo() {

   }

   logForm() {
      console.log(this.loginGrp.value);
      this.loginUname = this.loginGrp.value.uName;
      this.loginPassword = this.loginGrp.value.pass;

      this.params = {
         "token": ConfigService.token, "email": this.loginUname,
         "password": this.loginPassword, "type": "normal"
      };

      return new Promise((resolve, reject) => {
         this.loader = this.loaderCtrl.create({ content: 'Loading...' });
         this.loader.present();
         this.service
            .doLogin(ConfigService.backendServer + 'user/login?mob=true', this.params)
            .subscribe(

            result => {
               result = JSON.parse(result._body);
               console.log(result);
               // this.service.token = result.token; console.log(result);
               resolve();
               this.loader.dismiss();
               this.wrongcred = 0;
               this.anonymous();
               this.service.loginInfo = result;

               this.localStorageService.setItems('userInfo', this.service.loginInfo);
               // this.token =  this.dataservice.token;
            },
            error => {
               this.wrongcred = 1;
               this.loader.dismiss();
            }
            );
      })


   }



   openRegister() {
      this.navCtrl.push(RegisterPage);
   }

   openForgot() {
      this.navCtrl.push(ForgotPage);
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
   }


   googleLogin(): void {
      this.LoaderService.showLoader('Logging In');
      //  this.authProvider.googleLogin();
      const provider = new firebase.auth.GoogleAuthProvider();
      alert(1);
      firebase.auth().signInWithRedirect(provider).then(() => {

         firebase.auth().getRedirectResult().then(result => {
            alert(12);
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            console.log(token, user);

            this.navCtrl.setRoot(SelectRestaurantPage);
            this.LoaderService.hideLoader();
         }).catch(function (error) {
            // Handle Errors here.
            console.log(error.message);
         });
      }).catch(function (error) {
         console.log('error outer :', error);
      })
   }

   facebookLogin(): void {
      this.authProvider.facebookLogin();
   }

   anonymous() {
      this.navCtrl.setRoot(SelectRestaurantPage);
   }

}
