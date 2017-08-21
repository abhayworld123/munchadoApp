import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';


@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth, public googlePlus: GooglePlus, 
    public facebook: Facebook) {}

  getUser():firebase.User {
     console.log(this.afAuth.auth.currentUser);
    return this.afAuth.auth.currentUser;
  }

  googleLogin(): Promise<any> {
    return this.googlePlus.login({
      'webClientId': '58557016177-0n12jmqft03mebihd5li4ktfu6vp579h.apps.googleusercontent.com',
      'offline': true
    })
    .then( res => {
      const credential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
      
      this.afAuth.auth.signInWithCredential(credential)
        .then( success => { console.log("Firebase success: " + JSON.stringify(success)); })
        .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
      })
    .catch(err => console.error("Error: ", err));
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
           
        this.afAuth.auth.signInWithCredential(facebookCredential)
        .then((success) => { console.log("Firebase success: " + JSON.stringify(success)); console.log('loginnnn') })
        .catch((error) => { console.log("Firebase failure: " + JSON.stringify(error)); });

      })
      .catch((error) => { console.log(error) });
  }

  

}
