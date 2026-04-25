import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogContentComponent } from './user-dialog-content.component';

describe('DialogContentComponent', () => {
  let component: UserDialogContentComponent;
  let fixture: ComponentFixture<UserDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDialogContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
