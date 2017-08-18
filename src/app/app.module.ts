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
import { addtocardPage } from './../pages/addtocard/addtocard';
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


export const firebaseConfig = {
   apiKey: "AIzaSyBW4cwHEI7BHknNvF5ih7mFlCN716Itkjs",
   authDomain: "studentsro-21b7f.firebaseapp.com",
   databaseURL: "https://studentsro-21b7f.firebaseio.com",
   projectId: "studentsro-21b7f",
   storageBucket: "studentsro-21b7f.appspot.com",
   messagingSenderId: "252568098743"

}
firebase.initializeApp(firebaseConfig);
//  const storage = firebase.storage();
//  var storef =  storage.ref();
//  console.info(storef);

@NgModule({
   declarations: [

      MyApp, CartPage, addtocardPage, foodPage, StoryComponent, TakeoutPage, DeliveryPage,
      HomePage, CreatePage, LoginPage, IntroPage, SupertabssPage, checkouttabPage,
      StoryComponent, ReviewsPage, MenuPage, OverviewPage, DinenmorePage, TruncatePipe, SpaceConvertPipe,
      ReviewDescComponent, GallaryPage, GallarydetailsPage, CheckNull
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
      MyApp, CartPage, addtocardPage, foodPage, GallaryPage,
      HomePage, CreatePage, LoginPage, IntroPage, StoryComponent, ReviewsPage
      , MenuPage, OverviewPage, DinenmorePage, checkouttabPage, GallarydetailsPage
   ],
   providers: [
      StatusBar,
      SplashScreen, ServiceClass,
      GooglePlus,
      Facebook, DatePicker,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      AuthProvider
   ]


})
export class AppModule { }