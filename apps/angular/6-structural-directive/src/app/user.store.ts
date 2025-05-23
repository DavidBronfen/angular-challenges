import { computed, Injectable, signal } from '@angular/core';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  #user = signal<User | undefined>(undefined);

  isAdmin = computed(() => !!this.#user()?.isAdmin);

  add(user: User) {
    this.#user.set(user);
  }

  hasAnyRole(roles: Role | Role[]): boolean {
    const roleList = Array.isArray(roles) ? roles : [roles];

    return roleList.some((role) => this.#user()?.roles.includes(role));
  }
}
