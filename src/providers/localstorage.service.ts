import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observer } from 'rxjs/Observer';
// import * as constants from '../app/app.settings';
import 'rxjs/add/operator/catch';


@Injectable()
export class LocalStorageService {

   constructor(private storage: Storage) {
   }

   getItems(key) {
      return this.storage.get(key);
   }

   setItems(key, item) {
      this.storage.set(key, item);
   }

   removeItems(key) {
      this.storage.remove(key);
   }
}


