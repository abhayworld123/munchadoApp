import { foodPage } from './../food/food';

import { SupertabssPage } from './../supertabss/supertabss';

import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {TabsPage} from '../../pages/tabs/tabs';
import {} from '../pages/'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public authProvider: AuthProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openSignin(){
     this.navCtrl.pop();
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
