import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCompletedComponent } from './task-completed.component';

describe('TaskCompletedComponent', () => {
  let component: TaskCompletedComponent;
  let fixture: ComponentFixture<TaskCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCompletedComponent]
    });
    fixture = TestBed.createComponent(TaskCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
