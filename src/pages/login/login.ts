import { ServiceClass } from './../../providers/servicee';
import { ForgotPage } from './../forgot/forgot';
import { RegisterPage } from './../register/register';
import { foodPage } from './../food/food';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SupertabssPage } from './../supertabss/supertabss';

import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import {TabsPage} from '../../pages/tabs/tabs';
import { } from '../pages/'
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
      public authProvider: AuthProvider) {


      //          firebase.auth().onAuthStateChanged( user => {
      //         if (user) {
      //       console.log(user);
      //       this.userProfile = user;
      //     } else {
      //       console.log("There's no user here");
      //     }
      //   });

      this.uName = new FormControl('', Validators.required);
      this.pass = new FormControl('', [Validators.required]);
      this.loginGrp = this.formBuilder.group({
         uName: this.uName,
         pass: this.pass,
      });

   }

   logForm() {
      console.log(this.loginGrp.value);
      this.loginUname = this.loginGrp.value.uName;
      this.loginPassword = this.loginGrp.value.pass;

      this.params = {
         "token": this.service.token, "email": this.loginUname,
         "password": this.loginPassword, "type": "normal"
      };

      return new Promise((resolve, reject) => {
         this.loader = this.loaderCtrl.create({ content: 'Loading...' });
         this.loader.present();
         this.service
            .doLogin('http://api.munchado.in/api/user/login?mob=true', this.params)
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

      //  this.authProvider.googleLogin();
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithRedirect(provider).then(() => {
         alert(1);
         firebase.auth().getRedirectResult().then(result => {
            alert(12);
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            console.log(token, user);
         }).catch(function (error) {
            // Handle Errors here.
            console.log(error.message);
         });
      });
   }

   facebookLogin(): void {
      this.authProvider.facebookLogin();
   }

   anonymous() {
      this.navCtrl.setRoot(SupertabssPage);
   }

}
