import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDialog, MatDialogContent} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveService} from "../../../../services/leave.service";
import {AuthService} from "../../../../auth/auth.service";

@Component({
  selector: 'app-user-leave-dialog',
  templateUrl: './leave-dialog-content.component.html',
  styleUrl: './leave-dialog-content.component.scss'
})
export class UserLeaveDialogContentComponent {

  leaveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private authService: AuthService,
  ) {
    this.leaveForm = this.formBuilder.group({
      jour: ['', [Validators.required, Validators.minLength(1)]],
      raison: ['', [Validators.required, Validators.minLength(1)]],
      statut: ['En Attente'],
      dateDemande: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submitForm() {
    if (this.leaveForm.valid) {
      const formData = this.leaveForm.value;
      const user = this.authService.getUser();
      const employe =
        typeof user?.sub === 'string'
          ? user.sub
          : typeof user?.email === 'string'
            ? user.email
            : '';
      const payload = {
        employe,
        jour: new Date(formData.jour).toISOString(),
        duree: 1,
        raison: formData.raison,
        statut: formData.statut ?? 'En Attente',
        dateDemande: new Date(formData.dateDemande).toISOString(),
      };
      this.leaveService.createLeave(payload).subscribe(() => {
        this.dialog.closeAll();
      }, error => {
        console.error('Error:', error);
      });
    } else {
      console.error('Form is not valid:', this.leaveForm.errors); // Log form errors
    }
  }

  readonly dialog = inject(MatDialog);

}
