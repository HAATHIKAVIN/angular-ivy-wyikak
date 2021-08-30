import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchterm: any): any {
    if(value.length === 0){
      return value;
    }
    return value.filter(function(search){
      return search.Empname.toLowerCase().indexOf(searchterm.toLowerCase()) > -1
    });
  }

}