import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
  import {AngularFireModule } from 'angularfire2';
  import  {FirebaseListObservable , } from 'angularfire2/database';
  import  * as firebase from 'firebase'; 
  import { AngularFireDatabase } from 'angularfire2/database';
  

/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
songs: FirebaseListObservable<any>;
songslike: FirebaseListObservable<any>;
  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFireDatabase,public navParams: NavParams) {
 this.songs = af.list('/itemss');  

 this.songslike = af.list('/itemssd');  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }


  addSong(name, post, phone ,city){
 this.songs.push({
            name: name,
            post : post || "dsasdsadsasadspppppppppppppppppsdad",
            phone: phone,
            city:city,
            

          }),


           this.songslike.push({
            count:34
            

          }).then( newPost => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });

 
  let toast = this.toastCtrl.create({
      message: 'User added successfully',
      duration: 2000
    });
    toast.present();


}

}
