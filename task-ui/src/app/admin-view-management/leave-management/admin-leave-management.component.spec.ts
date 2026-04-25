import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaveManagementComponent } from './admin-leave-management.component';

describe('LeaveManagementComponent', () => {
  let component: AdminLeaveManagementComponent;
  let fixture: ComponentFixture<AdminLeaveManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLeaveManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeaveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
