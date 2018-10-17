import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'keys',  pure: false })
export class KeysPipe implements PipeTransform {
  transform(value) {
    console.log(value)
    return Object.keys(value).map(key => value[key]);
  }
}
