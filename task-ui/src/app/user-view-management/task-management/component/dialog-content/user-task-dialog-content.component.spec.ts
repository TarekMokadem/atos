import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskDialogContentComponent } from './user-task-dialog-content.component';

describe('DialogContentComponent', () => {
  let component: UserTaskDialogContentComponent;
  let fixture: ComponentFixture<UserTaskDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTaskDialogContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTaskDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
