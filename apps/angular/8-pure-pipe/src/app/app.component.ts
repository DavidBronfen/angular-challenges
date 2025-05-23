import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { IndexSuffixPipe } from './index-suffix.pipe';

@Component({
  imports: [NgFor, IndexSuffixPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | indexSuffix: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
