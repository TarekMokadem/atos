import {Component, inject} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResponsableService} from "../../../../services/responsable.service";

@Component({
  selector: 'app-admin-responsable-create-dialog',
  templateUrl: './responsable-leave-dialog-content.component.html',
  styleUrl: './responsable-leave-dialog-content.component.scss'
})
export class UserResponsableLeaveDialogContentComponent {

  responsableForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private responsableService: ResponsableService) {
    this.responsableForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submitForm() {
    if (this.responsableForm.valid) {
      const name = (this.responsableForm.value.nom as string).trim();
      this.responsableService.createResponsable({ name }).subscribe({
        next: () => this.dialog.closeAll(),
        error: (err) => console.error('Error:', err),
      });
    }
  }

  readonly dialog = inject(MatDialog);

}
