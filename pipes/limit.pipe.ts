import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'LimitPipe'
})
export class LimitPipe implements PipeTransform {
  transform(value: any[], limit: number) {
    if (!Array.isArray(value) || !limit) {
      return value;
    }

    return value.slice(0, limit);
  }
}
