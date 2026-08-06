import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDivider, MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-names-list',
  imports: [CDFlashingDirective, MatList, MatListItem, MatDivider],
  template: `
    <mat-list class="flex w-full">
      @if (namesList()?.length === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      @for (name of namesList(); track name) {
        <mat-list-item cd-flash class="text-orange-500">
          <div class="flex justify-between">
            <h3 title="Name">
              {{ name }}
            </h3>
          </div>
        </mat-list-item>
      }
      @if (namesList()?.length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamesListComponent {
  namesList = input<string[]>([]);
}
