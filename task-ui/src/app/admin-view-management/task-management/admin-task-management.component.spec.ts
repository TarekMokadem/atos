import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTaskManagementComponent } from './admin-task-management.component';

describe('TaskManagementComponent', () => {
  let component: AdminTaskManagementComponent;
  let fixture: ComponentFixture<AdminTaskManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTaskManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
