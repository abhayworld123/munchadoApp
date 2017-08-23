import { checkouttabPage } from './../checkouttab/checkouttab';
import { SupertabssPage } from './../supertabss/supertabss';
import { Observer } from 'rxjs/Observer';
import { AddToCartPage } from './../addtocard/addtocard';
import { CartPage } from './../cartpage/cartpage';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
class Test {
   constructor(elem: HTMLElement) {
      elem.style.color = 'red';
   };
}



@Component({
   selector: 'page-menu',
   templateUrl: 'menu.html',
})
export class MenuPage {

   menudata: any;
   baseurl: any;
   restaurantreviews = [];
   populardishes = [];
   gallary = [];
   typeofplace = [];

   menusubcategories = [];
   categoryitems = [];
   itemprices = [];
   Myslideoptions1: any;
   sliderr: any;
   optionss: any;
   stories: any;
   offsety: any;
   reviews: any;
   @ViewChild(Content) content: Content;
   constructor(public modalCtrl: ModalController, public service: ServiceClass, public storage: Storage, public navCtrl: NavController, public navparam: NavParams, public viewCtrl: ViewController) {
      console.log('this.service.loginInfo: ' + JSON.stringify(this.service.loginInfo));
   }

   ionViewDidLoad() {
      // console.log('ionViewDidLoad MenuPage');
   }

   presentModal(item, ind) {
      let modal = this.modalCtrl.create(AddToCartPage, { dish: item });
      modal.present();
   }

   openCartpage() {
      this.navCtrl.push(checkouttabPage);
   }


   scrolllto(elementidm, ind) {
      if (typeof elementidm != 'undefined') {
         elementidm = '#menu' + ind;
         setTimeout(() => {
            if (<HTMLElement>document.querySelector(elementidm)) {
               this.offsety = <any>(<HTMLElement>document.querySelector(elementidm)).offsetTop;
               // console.log(this.offsety);
            }
            else
               throw new Error("sorry not ind ");
            this.content.scrollTo(0, this.offsety, 1000);
            this.content.scrollTo(0, this.offsety, 1000);
         }, 100)
      }
   }

   public ngOnInit() {
      this.service.getmenuitems(this.service.token)
         .subscribe(menuitems => {
            this.menudata = menuitems.data;
            this.menudata.forEach(element => {
               this.menusubcategories.push(...element.sub_categories);
               this.menusubcategories.forEach(element1 => {
                  this.categoryitems.forEach(element2 => {
                     this.itemprices.push(element2);
                  })
               })
            });
         });
   }
}
