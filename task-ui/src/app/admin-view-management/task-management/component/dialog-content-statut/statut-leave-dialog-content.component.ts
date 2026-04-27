import {Component, inject} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StatutService} from "../../../../services/statut.service";

@Component({
  selector: 'app-admin-statut-create-dialog',
  templateUrl: './statut-leave-dialog-content.component.html',
  styleUrl: './statut-leave-dialog-content.component.scss'
})
export class UserStatutLeaveDialogContentComponent {

  statutForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private statutService: StatutService) {
    this.statutForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  submitForm() {
    if (this.statutForm.valid) {
      const name = (this.statutForm.value.nom as string).trim();
      this.statutService.createStatut({ name }).subscribe({
        next: () => this.dialog.closeAll(),
        error: (err) => console.error('Error:', err),
      });
    }
  }

  readonly dialog = inject(MatDialog);

}
