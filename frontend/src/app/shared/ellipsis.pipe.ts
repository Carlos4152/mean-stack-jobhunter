import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxLength: number = 20): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substr(0, maxLength) + '...';
    }
  }
}