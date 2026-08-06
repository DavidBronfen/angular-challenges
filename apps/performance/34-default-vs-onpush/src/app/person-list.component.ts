import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
} from '@angular/core';

import { TitleCasePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { AddPersonComponent } from './add-person.component';
import { NamesListComponent } from './names-list.component';

@Component({
  selector: 'app-person-list',
  imports: [
    MatChipsModule,
    TitleCasePipe,
    AddPersonComponent,
    NamesListComponent,
  ],
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <app-add-person (updateName)="updateListWithNewName($event)" />
    <app-names-list [namesList]="dynamicNamesList()" />
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  names = input<string[]>([]);
  title = input('');

  dynamicNamesList = linkedSignal(() => this.names());

  updateListWithNewName(name: string) {
    this.dynamicNamesList.update((names) => [name, ...names]);
  }
}
