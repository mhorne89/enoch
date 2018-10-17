import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'from'})
export class TimeFromPipe implements PipeTransform {
  transform(timestamp: string): string {
    const iso_time = moment(timestamp, 'x').format();
    return moment(iso_time).fromNow();
  }
}
