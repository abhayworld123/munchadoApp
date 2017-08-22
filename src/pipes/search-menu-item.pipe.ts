import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'searchMenuItemsPipe'
})
export class searchPipe implements PipeTransform {
   transform(value: any[], args: string): any[] {

      console.log('value', value);
      console.log('args', args);
      if (!args || !value) {
         return value;
      }
      args = args.toUpperCase();
      let newValue = [];
      value.forEach(element => {

         if (this.filterValue(element, args)) {
            newValue.push(element);
         }
      })
      console.log('newValue: ', newValue);
      return newValue;

   }

   private filterValue(element, args) {

      if (this.matchValue(element.category_name, args)) {
         console.log('returning true');
         return true;
      }
      if (!element.category_items) {
         return false;
      }
      for (let i = 0; i < element.category_items.length; i++) {
         let obj = element.category_items[i];
         if (this.matchValue(obj.item_name, args)) {
            return true;
         }
      }
   }

   private matchValue(name, args) {
      name = name.toUpperCase();
      args = args.toUpperCase();
      console.log('name: ', name, args);
      if (name.indexOf(args) != -1) {
         return true;
      }
      return false;
   }
}