import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" customClass="bg-light-green">
      <img
        card-image
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="" />
      <button
        card-action
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addStudent()">
        Add
      </button>

      <ng-template #rowTemplate let-row>
        <div class="flex justify-between border border-gray-300 px-2 py-1">
          {{ row.firstName }}
          <button (click)="deleteStudent(row.id)">
            <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
          </button>
        </div>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
