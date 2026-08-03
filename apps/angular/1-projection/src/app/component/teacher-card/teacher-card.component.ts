import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" customClass="bg-light-red">
      <img
        card-image
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="" />

      <button
        card-action
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addTeacher()">
        Add
      </button>

      <ng-template #rowTemplate let-row>
        <div class="flex justify-between border border-gray-300 px-2 py-1">
          {{ row.firstName }}
          <button (click)="deleteTeacher(row.id)">
            <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
          </button>
        </div>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
