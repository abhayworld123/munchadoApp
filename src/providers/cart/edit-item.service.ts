import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class EditItemService {
   public editItems = new Subject<string>();
   public updateCart = new Subject<string>();

   editItemsDetails(item: any) {
      this.editItems.next(item);
   }

   updateCartDetails() {
      this.updateCart.next();
   }
}