import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import {App} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public authProvider: AuthProvider,public afAuth: AngularFireAuth , public app:App) {}

  ionViewDidLoad() {
    this.userProfile = this.authProvider.getUser();
  }
  
  setDefaultPic(){
    this.userProfile.photoURL = "assets/logo.png";
  }

  logout(){
    
     if(this.afAuth.auth.currentUser){
         this.afAuth.auth.signOut();
         
     }
     else{
       
      //  this.navCtrl.rootNav.setRoot(LoginPage);
       this.app.getRootNav().setRoot(LoginPage);
       
     }
    
    
  }

}