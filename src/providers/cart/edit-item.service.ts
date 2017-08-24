import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class EditItemService {
   public editItems = new Subject<string>();
   public updateCart = new Subject<string>();
   public selectMenuItem = new Subject<string>();
   public paymentPage = new Subject<string>();
   public slideToMenuPage = new Subject<string>();

   editItemsDetails(item: any) {
      this.editItems.next(item);
   }

   updateCartDetails() {
      this.updateCart.next();
   }

   selectMenuFromOverview(id) {
      this.selectMenuItem.next(id);
   }

   gotoPaymentPage(orderDetails) {
      this.paymentPage.next(orderDetails);
   }

   slideToMenu() {
      this.slideToMenuPage.next();
   }
}