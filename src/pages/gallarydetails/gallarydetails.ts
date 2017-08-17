import { Component } from '@angular/core';
import {Http } from '@angular/http';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';  
import { Slides } from 'ionic-angular';       

import { NavController ,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-gallarydetails',
  templateUrl: 'gallarydetails.html'
})
export class GallarydetailsPage {
  
  @ViewChild(Slides) slides: Slides;

  gallary:any;
  baseuri:any;
  galdata:any;
  currentIndex:any =0 ;
  index:any =0 ;
  mySlideOptions = {
    pager:true,
    autoplay:"1000"
  };

  constructor(public navCtrl: NavController , public navparam:NavParams,public http:Http, public viewCtrl:ViewController, public modalCtrl: ModalController) {
   
       this.galdata = this.navparam.get("resname");
                console.log(this.galdata.index);
      this.index =    this.galdata.index;    
       setTimeout(() => {
      this.slides.slideTo(this.index,0);
    },0);   

  }
 
    ngOnInit(){
     
    }
     slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    // console.log('Current index is', this.currentIndex);
    }

    backk(){
     this.slides.slideTo(this.currentIndex-1,500);   
    }

    frwd(){
    this.slides.slideTo(this.currentIndex+1,500);   
    }

    closeModal(){
       this.viewCtrl.dismiss();
    }
}
