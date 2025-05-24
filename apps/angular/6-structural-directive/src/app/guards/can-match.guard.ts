import { inject } from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

export const canMatch = (roles: Role[]): boolean => {
  const userStore = inject(UserStore);
  return userStore.isAdmin() || userStore.hasAnyRole(roles);
};
