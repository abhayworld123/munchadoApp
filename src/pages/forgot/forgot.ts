import { ServiceClass } from './../../providers/servicee';
import { foodPage } from './../food/food';

import { SupertabssPage } from './../supertabss/supertabss';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
// import {TabsPage} from '../../pages/tabs/tabs';
import { } from '../pages/'

@IonicPage()
@Component({
   selector: 'page-forgot',
   templateUrl: 'forgot.html',
})
export class ForgotPage {
   forgotEmail: any;
   private forgotGrp: FormGroup;
   params: any;
   loader: any;
   validForgot:any = 0;
   alert: any;

   constructor(private alertCtrl: AlertController, private service: ServiceClass, private loadCtrl: LoadingController, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams,
      public authProvider: AuthProvider) {
      this.forgotEmail = new FormControl('', [Validators.required, Validators.email]);

      this.forgotGrp = this.formBuilder.group({
         forgotEmail: this.forgotEmail,
      });

   }
   // this.rEmail = new FormControl ('', [Validators.required , Validators.email]  );

   ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
   }


   forgotForm() {
      //  console.log(formm);
      // console.log(this.registrationGrp);
      //  this.regFullname = formm.value.uName;
      //  this.loginPassword = formm.value.password;
      console.log(this.forgotGrp);
      if (this.forgotGrp.value.forgotEmail) {
         this.params = { "token": this.service.token, "email": this.forgotGrp.value.forgotEmail };
           
        
         return new Promise((resolve, reject) => {
            this.loader = this.loadCtrl.create({ content: 'Please Wait' });
            this.loader.present();
            this.service
               .forgotPass('http://api.munchado.in/api/user/forgot-password/0?mob=true', this.params)
               .subscribe(
               result => {
                  result = JSON.parse(result._body);
                  console.log(result);
                  // this.service.token = result.token; console.log(result);
                  resolve();
                  // this.token =  this.dataservice.token;
                  this.loader.dismiss();
                  this.alert = this.alertCtrl.create({
                     title: 'Success',
                     subTitle: 'Password Sent',
                     buttons: ['Dismiss']
                  });
                  this.alert.present();
                  this.validForgot  =0;
                  // this.navCtrl.pop();
               },
               error => {

                  error = JSON.parse(error._body);
                  console.log(error);

                  this.alert = this.alertCtrl.create({
                     title: '',
                     subTitle: error.message,
                     buttons: ['Close']
                  });
                  this.alert.present();



                  this.loader.dismiss();
               }
               );
         })


      }

      else{
         console.log("erro");
         this.validForgot =  1;
      }

   }




}
