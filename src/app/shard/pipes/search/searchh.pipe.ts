import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchh'
})
export class SearchhPipe implements PipeTransform {
   

  transform(arr: any[], searchkey: string): any[] {
    return arr.filter((current) => current.title.toLowerCase().includes(searchkey.toLocaleLowerCase()));
  }

}
