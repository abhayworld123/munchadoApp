import { Pipe, PipeTransform ,Injectable } from '@angular/core';


@Pipe({name: 'myfilter'})

 @Injectable()
  export class MyFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
    
      return items.filter(item => { return item });
    
    }
  }


 