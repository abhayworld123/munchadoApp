import { ServiceClass } from './../../providers/servicee';
import { ForgotPage } from './../forgot/forgot';
import { RegisterPage } from './../register/register';
import { foodPage } from './../food/food';

import { SupertabssPage } from './../supertabss/supertabss';

import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {TabsPage} from '../../pages/tabs/tabs';
import {} from '../pages/'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
body:any;
loginData :any = {};
params:any;
  constructor( public service : ServiceClass,public navCtrl: NavController, public navParams: NavParams, 
  public authProvider: AuthProvider) {}
 


   public Login() {
 this.params = {"token":this.service.token,"email":"neel.aydigital@gmail.com",
 "password":"reset$123","type":"normal"};
      
      return new Promise((resolve, reject) => {
         this.service
            .doLogin('http://api.munchado.in/api/user/login?mob=true', this.params)
            .subscribe(
            result => {
               result = JSON.parse(result._body);
               console.log(result);
               // this.service.token = result.token; console.log(result);
               resolve();
               // this.token =  this.dataservice.token;
            },
            error => {
               reject(error);
            }
            );
      })

   }

  openRegister(){
     this.navCtrl.push(RegisterPage);
  }

  openForgot(){
     this.navCtrl.push(ForgotPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  googleLogin(): void {
    this.authProvider.googleLogin();
  }

  facebookLogin(): void {
    this.authProvider.facebookLogin();
  }

  anonymous(){
    this.navCtrl.setRoot(SupertabssPage);
  }

}
