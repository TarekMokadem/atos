import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogContentComponent } from './task-dialog-content.component';

describe('DialogContentComponent', () => {
  let component: TaskDialogContentComponent;
  let fixture: ComponentFixture<TaskDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
