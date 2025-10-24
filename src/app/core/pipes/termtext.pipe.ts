import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termtext',
  standalone: true,
})
export class TermtextPipe implements PipeTransform {
  transform(text: String, terms: number = 3): string {
    return text.split(' ', terms).join(' ');
  }
}
