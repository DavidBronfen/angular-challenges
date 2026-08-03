import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" customClass="bg-light-blue">
      <img
        card-image
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt="" />

      <button
        card-action
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addCity()">
        Add
      </button>

      <ng-template #rowTemplate let-row>
        <div class="flex justify-between border border-gray-300 px-2 py-1">
          {{ row.name }}
          <button (click)="deleteCity(row.id)">
            <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
          </button>
        </div>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-blue {
        background-color: rgba(0, 150, 250, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
  }

  addCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
