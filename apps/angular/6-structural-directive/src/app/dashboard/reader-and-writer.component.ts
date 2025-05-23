import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-reader-and-writer',
  imports: [CommonModule, ButtonComponent, RouterLink],
  template: `
    <p>dashboard for Reader and Writer works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReaderAndWriterComponent {}
