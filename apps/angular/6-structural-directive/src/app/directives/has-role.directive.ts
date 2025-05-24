import { NgIf } from '@angular/common';
import { Directive, effect, inject, input } from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole], [hasRoleAdmin]',
  hostDirectives: [NgIf],
  standalone: true,
})
export class HasRoleDirective {
  // viewContainerRef = inject(ViewContainerRef);
  // templateRef = inject(TemplateRef);
  userStore = inject(UserStore);
  ngIfDirective = inject(NgIf);

  hasRole = input<Role | Role[] | undefined>();
  hasRoleAdmin = input<boolean | undefined>();

  constructor() {
    effect(() => {
      const roles = this.hasRole();
      const roleAdmin = this.hasRoleAdmin();

      // if (!roles && !roleAdmin) {
      //   this.clearTemplate();
      // }

      this.ngIfDirective.ngIf =
        (roleAdmin && this.userStore.isAdmin()) ||
        (roles?.length && this.userStore.hasAnyRole(roles));
    });
  }

  // addTemplate(): void {
  //   this.clearTemplate();
  //   this.viewContainerRef.createEmbeddedView(this.templateRef);
  // }
  //
  // clearTemplate(): void {
  //   this.viewContainerRef.clear();
  // }
}
