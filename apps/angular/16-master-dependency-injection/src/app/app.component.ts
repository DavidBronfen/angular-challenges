import { TableComponent } from '@angular-challenges/shared/ui';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product, products } from './product.model';

interface ProductContext {
  $implicit: Product;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[product]',
})
export class ProductDirective {
  static ngTemplateContextGuard(
    dir: ProductDirective,
    ctx: unknown,
  ): ctx is ProductContext {
    return true;
  }
}

@Directive({
  selector: 'tr[productRow]',
  providers: [CurrencyService],
})
export class ProductRowDirective implements OnInit {
  #currencyService = inject(CurrencyService);
  productRow = input.required<Product>();

  // ngOnInit, not effect(): productRow is a required input set once per row and never
  // reassigned, so there's nothing to react to. effect() is for values that change over
  // time; a one-time init is a better fit for a one-time value.
  ngOnInit(): void {
    const product = this.productRow();
    this.#currencyService.setState({ code: product.currencyCode });
  }
}

@Component({
  imports: [
    TableComponent,
    CurrencyPipe,
    AsyncPipe,
    ProductDirective,
    ProductRowDirective,
  ],
  selector: 'app-root',
  template: `
    <table [items]="products">
      <ng-template #header>
        <tr>
          @for (col of displayedColumns; track $index) {
            <th>
              {{ col }}
            </th>
          }
        </tr>
      </ng-template>
      <ng-template #body product let-product>
        <tr [productRow]="product">
          <td>{{ product.name }}</td>
          <td>{{ product.priceA | currency | async }}</td>
          <td>{{ product.priceB | currency | async }}</td>
          <td>{{ product.priceC | currency | async }}</td>
        </tr>
      </ng-template>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
