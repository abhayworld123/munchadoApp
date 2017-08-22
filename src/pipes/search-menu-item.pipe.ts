import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'searchMenuItemsPipe'
})
export class searchPipe implements PipeTransform {
   transform(value: any[], args: string): any[] {
      if (!args || !value) {
         return value;
      }
      args = args.toUpperCase();
      let newValue = [];
      value.forEach(element => {
         if (element.item_name.toUpperCase().indexOf(args.toUpperCase()) != -1) {
            newValue.push(element);
         }
      })
      return newValue;
   }
}