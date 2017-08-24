import { PopoverrComponent } from './../../components/popover/popover';
import { checkouttabPage } from './../checkouttab/checkouttab';
import { AddToCartPage } from './../addtocard/addtocard';
import { Component, ViewChild } from '@angular/core';
import { ViewController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';
import { EditItemService } from '../../providers/cart/edit-item.service';
import { LoaderService } from '../../common/loader.service';
import { PopoverController } from 'ionic-angular';

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
   constructor(public modalCtrl: ModalController,
      public service: ServiceClass,
      public storage: Storage,
      public navCtrl: NavController,
      public navparam: NavParams,
      public viewCtrl: ViewController,
      private editItemService: EditItemService,
      private loaderService: LoaderService,
     private PopoverController : PopoverController) {

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


   scrolllto(elementid, ind) {
      if (typeof elementid != 'undefined') {
         elementid = '#menu' + ind;
         this.scrollToId(elementid);
      }
   }

   public scrollToId(elementId) {
      let elementidm = elementId; // elementid.split(' ').join('')
      setTimeout(() => {
         if (<HTMLElement>document.querySelector(elementidm)) {
            this.offsety = <any>(<HTMLElement>document.querySelector(elementidm)).offsetTop;
         }
         else
            throw new Error("sorry not ind ");
         this.content.scrollTo(0, this.offsety, 1000);
         this.content.scrollTo(0, this.offsety, 1000);
      }, 100)

   }
  


   showJumptoCategory(){
      console.log('');
         let popover = this.PopoverController.create(PopoverrComponent);
    popover.present({
    
    });
    
   }

   public ngOnInit() {
      this.editItemService.selectMenuItem.subscribe(
         (itemId) => {
            this.loaderService.showLoader()
               .then(
               () => {
                  setTimeout(
                     () => {
                        this.scrollToId('#item_' + itemId);
                        this.loaderService.hideLoader();
                     }, 100
                  );
               }
               );

         }
      );
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
