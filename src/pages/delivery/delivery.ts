import { User } from './../../components/form.interface';
import { checkouttabPage } from './../checkouttab/checkouttab';
import { StoryComponent } from './../../components/story/story';
import { DinenmorePage } from './../dinenmore/dinenmore';
import { ReviewsPage } from './../reviews/reviews';
import { MenuPage } from './../menu/menu';
import { OverviewPage } from './../overview/overview';
import { Observer } from 'rxjs/Observer';
import { addtocardPage } from './../addtocard/addtocard';
import { CartPage } from './../cartpage/cartpage';
import { foodPage } from './../food/food';

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';
import { DatePicker } from '@ionic-native/date-picker';


/**
 * Generated class for the DeliveryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {



  constructor(private datePicker: DatePicker,public navCtrl: NavController, public navParams: NavParams) {
  }

  //  Addressnickname: string;
  //   Address:string;
  //   Appartment:string;
  //   zipcode:string;
  //   special:Text;
  user: FormGroup;
  mydate:any;
  mydate1:any;

  ngOnInit() {
     
//     this.datePicker.show({
//   date: new Date(),
//   mode: 'date',
//   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
// }).then(
//   date => console.log('Got date: ', date),
//   err => console.log('Error occurred while getting date: ', err)
// );

  


    this.user = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      Addressnickname: new FormControl(''),
      Address: new FormControl(''),
      Appartment: new FormControl(''),
      zipcode: new FormControl(''),
      special: new FormControl(''),

      account: new FormGroup({
        email: new FormControl(''),
        phone: new FormControl(''),

        confirm: new FormControl('')
      })
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPage');
  }

}
