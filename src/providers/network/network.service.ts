import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class NetworkService implements OnInit, OnDestroy {

   public onNetworkConnect: Subject<string> = new Subject<string>();
   public onNetworkDisconnect: Subject<string> = new Subject<string>();

   private onDisconnect$Subscription: Subscription;
   private onConnect$Subscription: Subscription;

   constructor(private network: Network) {

   }

   public ngOnInit() {
      this.onConnect$Subscription = this.network.onConnect().subscribe(() => {
         console.log('network connected :-(');
         this.onNetworkConnect.next();
      });
      this.onDisconnect$Subscription = this.network.onDisconnect().subscribe(() => {
         console.log('network disconnected :-(');
         this.onNetworkDisconnect.next();
      });
      // console.log('this.network.type: ', this.network.type);
   }

   public ngOnDestroy() {
      if (this.onConnect$Subscription)
         this.onConnect$Subscription.unsubscribe();
      if (this.onDisconnect$Subscription)
         this.onDisconnect$Subscription.unsubscribe();
   }

   public getNetworkType() {
      return this.network.type;
   }
}