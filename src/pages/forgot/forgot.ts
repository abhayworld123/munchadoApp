import { foodPage } from './../food/food';

import { SupertabssPage } from './../supertabss/supertabss';

import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {TabsPage} from '../../pages/tabs/tabs';
import {} from '../pages/'

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public authProvider: AuthProvider) {}
// this.rEmail = new FormControl ('', [Validators.required , Validators.email]  );

ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  
}
