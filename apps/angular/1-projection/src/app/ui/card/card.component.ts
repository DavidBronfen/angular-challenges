import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-image]" />

      <section>
        @for (item of list(); track item.id) {
          <ng-container
            [ngTemplateOutlet]="rowTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      </section>

      <ng-content select="[card-action]" />
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  readonly customClass = input<string>('');
  readonly list = input<T[]>([]);
  readonly rowTemplate = contentChild<TemplateRef<unknown> | undefined>(
    'rowTemplate',
  );
}
