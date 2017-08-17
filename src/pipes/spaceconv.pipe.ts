import {Pipe , PipeTransform} from '@angular/core';

@Pipe({
  name: 'spaceconvert'
})
export class SpaceConvertPipe implements PipeTransform {
  transform(value: string, args: string[]) : string {
     let returnString:any = args;
  let convertString = returnString.replace(" ","_");
     console.log(returnString);
    return convertString;
    
  }
}