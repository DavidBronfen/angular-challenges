import { InjectionToken } from '@angular/core';

export const TIMER = new InjectionToken<number>('TIMER', {
  providedIn: 'root',
  factory: () => 1000,
});
