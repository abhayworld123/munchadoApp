import {Pipe , PipeTransform} from '@angular/core';

@Pipe({
  name: 'nullCheck'
})
export class CheckNull implements PipeTransform {
  transform(value: string, args: string[]) : string {
     let returnString:any = value;

   //   console.log(value + '2' + args);
     if (value == null || value == 'null')
      returnString = '0';
     else
      returnString = value;

     console.log(returnString);
     return returnString;
    
  }
}