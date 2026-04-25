import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDialogContentComponent } from './statut-leave-dialog-content.component';

describe('DialogContentComponent', () => {
  let component: LeaveDialogContentComponent;
  let fixture: ComponentFixture<LeaveDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveDialogContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
