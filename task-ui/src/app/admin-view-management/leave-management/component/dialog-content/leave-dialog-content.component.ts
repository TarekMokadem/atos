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
  styleUrl: './responsable-statut-leave-dialog-content.component.scss'
})
export class LeaveDialogContentComponent {

  leaveForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private leaveService: LeaveService) {
    this.leaveForm = this.formBuilder.group({
      employe: ['', [Validators.required, Validators.minLength(1)]],
      jour: ['', [Validators.required, Validators.minLength(1)]],
      duree: ['', [Validators.required, Validators.minLength(1)]],
      raison: ['', [Validators.required, Validators.minLength(1)]],
      statut: ['', [Validators.required, Validators.minLength(1)]],
      dateDemande: [new Date().toISOString()],
    });
  }

  submitForm() {
    if (this.leaveForm.valid) {
      const formData = this.leaveForm.value;
      // Convertir la durée en nombre
      const duree = Number(formData.duree);
      // Créer un nouvel objet Date à partir de la date de début
      const dateDebut = new Date(formData.jour);
      // Ajouter la durée à la date de début pour obtenir la date de fin
      const dateFin = new Date(dateDebut);
      dateFin.setDate(dateDebut.getDate() + duree);
      // Ajouter la date de fin au formData
      formData.dateFin = dateFin.toISOString();
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
