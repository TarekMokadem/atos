import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDialog, MatDialogContent} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {TaskService} from "../../../../services/task.service";

@Component({
  selector: 'app-dialog-content',
  templateUrl: './task-dialog-content.component.html',
  styleUrl: './task-dialog-content.component.scss'
})
export class TaskDialogContentComponent {
  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.formBuilder.group({
      ticket: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      type: ['', [Validators.required, Validators.minLength(1)]],
      statut: [''],
      responsable: ['', [Validators.required, Validators.minLength(1)]],
      chDev: [''],
      chiffrage: [''],
      devTig: [''],
      livraisonTig: [''],
      dateReponse: [''],
      commentaire: ['']
    });
  }

  submitForm() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      console.log('Form data:', formData); // Log form data
      this.taskService.createTask(formData).subscribe(response => {
        console.log('Response:', response); // Log response
        this.dialog.closeAll();
      }, error => {
        console.error('Error:', error); // Log error
      });
    } else {
      console.error('Form is not valid:', this.taskForm.errors); // Log form errors
    }
  }

  readonly dialog = inject(MatDialog);
}
