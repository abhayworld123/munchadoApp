import { ServiceClass } from './../../providers/servicee';
import { foodPage } from './../food/food';

import { SupertabssPage } from './../supertabss/supertabss';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController ,AlertController } from 'ionic-angular';
// import {TabsPage} from '../../pages/tabs/tabs';
import {} from '../pages/'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
   params:any;
   loader:any;
   registerData :any;
   alert:any;
   private registrationGrp : FormGroup;

   firstName: FormControl;
   rEmail:FormControl;
   rPass:FormControl;
  constructor(private formBuilder: FormBuilder, private alertCtrl : AlertController, private loadCtrl: LoadingController ,public service: ServiceClass ,public navCtrl: NavController, public navParams: NavParams, 
  public authProvider: AuthProvider) {

   this.firstName = new FormControl('', Validators.required);
   this.rEmail = new FormControl ('', [Validators.required , Validators.email]  );
   this.rPass = new FormControl ('',Validators.minLength(8));
  this.registrationGrp = this.formBuilder.group({
      firstName: this.firstName,
      lastName: [''],
      rEmail:this.rEmail,
      rPass:  this.rPass ,
      dine: [''],
      newsletter: ['false',Validators.required]



    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openSignin(){
     this.navCtrl.pop();
  }

   registerForm(){
   //  console.log(formm);
      console.log(this.registrationGrp);
   //  this.regFullname = formm.value.uName;
   //  this.loginPassword = formm.value.password;

    this.params = {"token":this.service.token,
    "email":this.registrationGrp.value.rEmail,
    "password":this.registrationGrp.value.rPass,
    "first_name":this.registrationGrp.value.firstName,
    "last_name":this.registrationGrp.value.lastName,
    "accept_toc":"1",
    "newsletter_subscription":"1",
    "loyality_code":"",
    "referral_code":""}

;
      
      return new Promise((resolve, reject) => { 
         this.loader = this.loadCtrl.create({content:'Loading'});
         this.loader.present();
         this.service
            .doRegister('http://api.munchado.in/api/user/details?mob=true', this.params)
            .subscribe(
            result => {
               result = JSON.parse(result._body);
               this.registerData = result;
               console.log(result);
               // this.service.token = result.token; console.log(result);
               resolve();
               // this.token =  this.dataservice.token;
              this.loader.dismiss();
               this.navCtrl.pop();
            },
            error => { 
              console.log (error._body);
              error = JSON.parse(error._body);
              if (error.message == "Email is already registered."){
                  this.alert = this.alertCtrl.create({
                     title: 'Warning',
                     subTitle: error.message,
                     buttons: ['Dismiss']
                  });
                  this.alert.present();
              }
               

               this.loader.dismiss();
            } 
            );
      })

 
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
