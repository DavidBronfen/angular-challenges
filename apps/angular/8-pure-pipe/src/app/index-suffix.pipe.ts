import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexSuffix',
})
export class IndexSuffixPipe implements PipeTransform {
  transform(value: unknown, index: number): string {
    return `${value} - ${index}`;
  }
}
