import { SupertabssPage } from './../supertabss/supertabss';
import { Observer } from 'rxjs/Observer';
import { addtocardPage } from './../addtocard/addtocard';
import { CartPage } from './../cartpage/cartpage';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ViewController, Slides, Content } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ServiceClass } from '../../providers/servicee';


@Component({
  selector: 'page-food',
  templateUrl: 'food.html',
  queries: {
    content: new ViewChild('content')
  }
})
export class foodPage {

  menuoverviewdata: any;
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

  @ViewChild(Slides) slides: Slides;
  @ViewChild('myslide') mySlider: Slides;
  @ViewChild(Content) content: Content;
  @ViewChild('abc') abc: any;
  @ViewChild('slide1') slide1: any;
  @ViewChild('slide2') slide2: any;
  @ViewChild('slide3') slide3: any;
   @ViewChild('slide4') slide4: any;


  @ViewChild('slideo')slideo :any;
  @ViewChild('slidero')slidero:Slides;
  constructor(public modalCtrl: ModalController, public service: ServiceClass, public storage: Storage, public navCtrl: NavController, public navparam: NavParams, public viewCtrl: ViewController) {


    // this.slides.slidesPerView = 3;

    //  this.optionss = {
    //     slidesPerView:3,
    //     pager: true,
    //   nextButton: ".swiper-button-next",
    //   prevButton: ".swiper-button-prev",        
    //     onInit:()=>{
    //     }
    //  }  
  }


  ngAfterViewInit() {
    console.log(this.sliderr);
  

  }

  openCheckout = () => { this.navCtrl.push(CartPage) }

  ionViewDidEnter() {
    this.content.resize();
    // setInterval(() => {
    //   console.log(this.service.globalTotalItemSelected);
    // }, 15000);

  }


  optab = () =>{
    this.navCtrl.push(SupertabssPage);

  }

  ok(event) {

  let xyz =  this.slidero.getActiveIndex();
   let tempheight:any = this.slide1.nativeElement.scrollHeight;
  if (xyz == 0){
    tempheight =  this.slide1.nativeElement.scrollHeight;
  }

  else if (xyz == 1){
    tempheight =  this.slide2.nativeElement.scrollHeight;
  }
  
   else if (xyz == 2){
    tempheight =  this.slide3.nativeElement.scrollHeight;
  }

   else if (xyz == 3){
    tempheight =  this.slide3.nativeElement.scrollHeight;
  }
   else if (xyz == 4){
    tempheight =  this.slide4.nativeElement.scrollHeight;
  }

   console.log(tempheight);
   this.slidero.renderedHeight = tempheight;

  
   this.slidero.update();

   console.log(this.slidero.renderedHeight);   
  // this.slider._elementRef.nativeElement.style.height;
//  let om:any = <HTMLElement>this.slidero._elementRef.nativeElement.clientHeight 
//              om = tempheight; 


//  console.log(this.slidero._elementRef);
        // this.slidero.autoHeight = true;
      console.log( {'abc' : this.slide1.nativeElement});
      console.log(this.slide1.nativeElement.scrollHeight);
       console.log(this.slide2.nativeElement.scrollHeight);

      this.slidero.update();
    this.content.resize();

    console.log(this.content.contentHeight);
    this.content.scrollToTop();
    //300ms animation speed

  }




  scrolllto(event, ind) {
    console.log(event);


    if (typeof event.target.textContent != 'undefined') {
      let elementid: string = <any>event.target.textContent;

      elementid = '#' + elementid;

      let elementidm = elementid.split(' ').join('')
      console.log(elementidm);

      // console.log(this.abc.nativeElement);

      // let yOffset:any = document.getElementById('{elmentid}').offsetTop;
      setTimeout(() => {
        if (document.querySelector(elementidm)) {
          // this.offsety = document.querySelector(elementidm).offsetTop;
        }



        // this.content.scrollTo(0, this.offsety, 1000);
      }, 100)


    }

  }






  presentModal(item, ind) {
    console.log(item);
    console.log(ind);
    let modal = this.modalCtrl.create(addtocardPage, { dish: item });

    modal.present();
    // this.already= true;


  }


  ngOnInit() {

    this.Myslideoptions1 = {
      pager: true,
      slidesPerView: 3,
      freemode: true
    };



    this.baseurl = 'http://dc8l3mwto1qll.cloudfront.net/assets/munch_images/' + "rnymn06237/thumb/";

    this.service.getmenuoverview(this.service.token)
      .subscribe(menuoverview => {
        this.menuoverviewdata = menuoverview.data,
          console.log(menuoverview.data), console.log(this.baseurl + menuoverview.data.cover_image)

          , this.menuoverviewdata.restaurant_reviews.forEach(element => {

            this.restaurantreviews.push(element);


          }),

          this.menuoverviewdata.most_popular.forEach(element => {

            this.populardishes.push(element);

          }),
          this.menuoverviewdata.galleries.forEach(element => {

            this.gallary.push(element);

          }),
          this.menuoverviewdata.type_of_place.forEach(element => {

            this.typeofplace.push(element);


          });









      }
      );


    this.service.getmenuitems(this.service.token)
      .subscribe(menuitems => {
        this.menudata = {};
        this.menudata = menuitems,
          this.menudata.forEach(element => {

            this.menusubcategories.push(element.sub_categories);
            this.menusubcategories.forEach(element1 => {


              this.categoryitems.forEach(element2 => {
                this.itemprices.push(element2);
              })

            })
          })
        console.log(this.menusubcategories);
      }
      );

    this.service.getstory(this.service.token)
      .subscribe(story => {
        this.stories = story;

      });


    this.service.getreviews(this.service.token)
      .subscribe(reviews => {
        this.reviews = reviews.data,
          console.log(this.reviews.data);
      });




  }

}