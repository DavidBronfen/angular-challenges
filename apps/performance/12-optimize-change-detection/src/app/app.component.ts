import { Component, inject, NgZone, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    @if (displayButton()) {
      <button (click)="goToTop()">Top</button>
    }
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'scroll-cd';
  ngZone = inject(NgZone);

  public displayButton = signal(false);

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => {
        const buttonVisible = this.displayButton();
        if (
          (window.scrollY > 50 && !buttonVisible) ||
          (window.scrollY < 50 && buttonVisible)
        ) {
          this.ngZone.run(() => this.displayButton.set(!buttonVisible));
        }
      });

      /**
       * Logic fix sugestion by Claued:
       * window.addEventListener('scroll', () => {
       *   const shouldDisplay = window.scrollY > 50;
       *   if (shouldDisplay !== this.displayButton()) {
       *     this.ngZone.run(() => this.displayButton.set(shouldDisplay));
       *   }
       * });
       */

      /**
       * Anoother suggestion for a different approach I suggested (work with rxjs and create a stream of events)
       * Implementation by Claude:
       * fromEvent(window, 'scroll')
       *   .pipe(map(() => window.scrollY > 50), distinctUntilChanged(), takeUntilDestroyed())
       *   .subscribe(show => this.ngZone.run(() => this.displayButton.set(show)));
       */
    });
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
