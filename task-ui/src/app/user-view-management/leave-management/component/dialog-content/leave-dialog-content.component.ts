import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDialog, MatDialogContent} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveService} from "../../../../services/leave.service";

@Component({
  selector: 'app-dialog-content',
  templateUrl: './leave-dialog-content.component.html',
  styleUrl: './leave-dialog-content.component.scss'
})
export class UserLeaveDialogContentComponent {

  leaveForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private leaveService: LeaveService) {
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
      console.log('Form data:', formData); // Log form data
      this.leaveService.createLeave(formData).subscribe(response => {
        console.log('Response:', response); // Log response
        this.dialog.closeAll();
      }, error => {
        console.error('Error:', error); // Log error
      });
    } else {
      console.error('Form is not valid:', this.leaveForm.errors); // Log form errors
    }
  }

  readonly dialog = inject(MatDialog);

}
