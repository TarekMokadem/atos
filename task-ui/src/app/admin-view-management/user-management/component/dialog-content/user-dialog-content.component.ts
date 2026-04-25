import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDialog, MatDialogContent} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../../services/task.service";
import {UserService} from "../../../../services/user.service";
import * as intlTelInput from 'intl-tel-input';
import {AuthService} from "../../../../auth/auth.service";

@Component({
  selector: 'app-dialog-content',
  templateUrl: './user-dialog-content.component.html',
  styleUrl: './user-dialog-content.component.scss'
})
export class UserDialogContentComponent {
  userForm: FormGroup;
  selected = 'USER';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService) {
    this.userForm = this.formBuilder.group({
      creationDate: [new Date()],
      lastname: ['', [Validators.required, Validators.minLength(1)]],
      firstname: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      equipe: ['', [Validators.required, Validators.minLength(1)]],
      domaine: ['', [Validators.required, Validators.minLength(1)]],
      role: [this.selected, [Validators.required, Validators.minLength(1)]],
      mobile: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit() {
  }

  submitForm() {
    if (this.userForm.valid) {
      this.userForm.value.mobile = this.userForm.value.mobile.e164Number;
      const formData = this.userForm.value;
      console.log('Form data:', formData); // Log form data
      this.authService.signup(formData).subscribe(response => {
        console.log('Response:', response); // Log response
        this.dialog.closeAll();
      }, error => {
        console.error('Error:', error); // Log error
      });
    } else {
      console.error('Form is not valid:', this.userForm.errors); // Log form errors
    }
  }

  readonly dialog = inject(MatDialog);
}
