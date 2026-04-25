import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDialog, MatDialogContent} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveService} from "../../../../services/leave.service";

@Component({
  selector: 'app-dialog-content',
  templateUrl: './responsable-leave-dialog-content.component.html',
  styleUrl: './responsable-leave-dialog-content.component.scss'
})
export class UserResponsableLeaveDialogContentComponent {

  responsableForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private leaveService: LeaveService) {
    this.responsableForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submitForm() {
    if (this.responsableForm.valid) {
      const formData = this.responsableForm.value;
      console.log('Form data:', formData); // Log form data
      this.leaveService.createLeave(formData).subscribe(response => {
        console.log('Response:', response); // Log response
        this.dialog.closeAll();
      }, error => {
        console.error('Error:', error); // Log error
      });
    } else {
      console.error('Form is not valid:', this.responsableForm.errors); // Log form errors
    }
  }

  readonly dialog = inject(MatDialog);

}
