import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any[] {
    const result: any = [];
    if(!value || filterString=='' || propName == '') {
      return value;
    }
    // value.forEach((a: any) => {
    //   if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())) {
    //     result.push(a);
    //   }
    // });// we are checking in every object if the string we are searching for is present in value array or not

    value.forEach((a: any) => {
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())) {
        result.push(a);
      }
    });

    return result;
  }

}
