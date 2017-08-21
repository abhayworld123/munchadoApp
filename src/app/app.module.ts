import { ForgotPage } from './../pages/forgot/forgot';
import { RegisterPage } from './../pages/register/register';
import { CheckNull } from './../pipes/CheckNull.pipe';
import { GallarydetailsPage } from './../pages/gallarydetails/gallarydetails';
import { GallaryPage } from './../pages/gallary/gallary';
import { SpaceConvertPipe } from './../pipes/spaceconv.pipe';
import { TruncatePipe } from './../pipes/limitchar.pipe';
import { User } from './../components/form.interface';
import { DeliveryPage } from './../pages/delivery/delivery';
import { TakeoutPage } from './../pages/takeout/takeout';
import { checkouttabPage } from './../pages/checkouttab/checkouttab';
import { DinenmorePage } from './../pages/dinenmore/dinenmore';
import { OverviewPage } from './../pages/overview/overview';
import { MenuPage } from './../pages/menu/menu';
import { ReviewsPage } from './../pages/reviews/reviews';
import { SupertabssPage } from './../pages/supertabss/supertabss';
// import { SupertabPage } from './../pages/supertab/supertab';
import { ServiceClass } from './../providers/servicee';
import { CartPage } from './../pages/cartpage/cartpage';
import { AddToCartPage } from './../pages/addtocard/addtocard';
import { foodPage } from './../pages/food/food';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { LoginPage } from '../pages/login/login'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartService } from '../providers/cart/cart.service';
// import {TabsPage} from '../pages/tabs/tabs';
// import {DetailmarksPage} from '../pages/detailmarks/detailmarks';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { IntroPage } from '../pages/intro/intro';
import { CreatePage } from '../pages/create/create';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { StoryComponent } from '../components/story/story';
import { ReviewDescComponent } from '../components/review-desc/review-desc';

// common components
import { LoaderService } from '../common/loader.service';
import { EditItemService } from '../providers/cart/edit-item.service';

export const firebaseConfig = {
   apiKey: "AIzaSyAak8g9P2AN71pNOw4aY8LYSQoyIIfwmAM",
   authDomain: "munch-ada67.firebaseapp.com",
   databaseURL: "https://munch-ada67.firebaseio.com",
   projectId: "munch-ada67",
   storageBucket: "munch-ada67.appspot.com",
   messagingSenderId: "90720404304"
};
//   firebase.initializeApp(config);


firebase.initializeApp(firebaseConfig);
//  const storage = firebase.storage();
//  var storef =  storage.ref();
//  console.info(storef);

@NgModule({
   declarations: [

      MyApp, CartPage, AddToCartPage, foodPage, StoryComponent, TakeoutPage, DeliveryPage,
      HomePage, CreatePage, LoginPage, IntroPage, SupertabssPage, checkouttabPage,
      StoryComponent, ReviewsPage, MenuPage, OverviewPage, DinenmorePage, TruncatePipe, SpaceConvertPipe,
      ReviewDescComponent, GallaryPage, GallarydetailsPage, CheckNull, RegisterPage, ForgotPage
   ],
   imports: [
      BrowserModule, SuperTabsModule.forRoot(),
      IonicModule.forRoot(MyApp), HttpModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule, ReactiveFormsModule, FormsModule,
      AngularFireAuthModule, IonicStorageModule.forRoot(),
   ],
   bootstrap: [IonicApp],
   entryComponents: [
      SupertabssPage, StoryComponent, DeliveryPage, TakeoutPage,
      MyApp, CartPage, AddToCartPage, foodPage, GallaryPage,
      HomePage, CreatePage, LoginPage, IntroPage, StoryComponent, ReviewsPage
      , MenuPage, OverviewPage, DinenmorePage, checkouttabPage, GallarydetailsPage, RegisterPage,
      ForgotPage
   ],
   providers: [
      StatusBar,
      SplashScreen, ServiceClass,
      GooglePlus,
      Facebook, DatePicker,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      AuthProvider,
      CartService,
      LoaderService,
      EditItemService
   ]


})
export class AppModule { }
