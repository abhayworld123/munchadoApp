import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, Loading } from 'ionic-angular';

@Injectable()
export class LoaderService {
   loader: Loading;
   constructor(private loadingController: LoadingController) {

   }

   public showLoader(content?: any, duration?: any) {
      if (!duration || isNaN(duration)) {
         duration = 0;
      }
      let options: LoadingOptions = {
         content: content || 'Loading...',
         duration: duration * 1000 || undefined
      }
      this.loader = this.loadingController.create(options);
      return this.loader.present();
   }

   public hideLoader() {
      if (this.loader) {
         this.loader.dismiss();
         this.loader = undefined;
      }
   }
}