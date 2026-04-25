import {AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogContentComponent} from "./component/dialog-content/task-dialog-content.component";
import * as xls from 'xlsx';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../auth/auth.service";
import {
  UserStatutLeaveDialogContentComponent
} from "./component/dialog-content-statut/statut-leave-dialog-content.component";
import {
  UserResponsableLeaveDialogContentComponent
} from "./component/dialog-content-responsable/responsable-leave-dialog-content.component";
import {ResponsableService} from "../../services/responsable.service";
import {StatutService} from "../../services/statut.service";


@Component({
  selector: 'app-task-management',
  templateUrl: './admin-task-management.component.html',
  styleUrl: './admin-task-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTaskManagementComponent implements AfterViewInit {
  selectedResponsable = '';
  selectedStatut = '';
  fileName = '';
  taskData: any[] = [];
  excelFileTasks: any;
  excelFileTasksKeys: string[] = [];
  displayedColumns: string[] = ['ticket', 'description', 'type', 'statut', 'responsable', 'chDev', 'chiffrage', 'devTig', 'livraisonTig', 'dateReponse', 'ast', 'commentaire', 'action'];
  dataSource: MatTableDataSource<TaskData>;
  columnHeader: string[] = ['Ticket Jira', 'Description', 'Type', 'Statut', 'Responsable', 'CH.Dev', 'Chiffrage', 'Dev.Tig', 'Livraison Tig', 'Date reponse', 'AST', 'Commentaire'];
  Responsables: any[] = [];
  Types: any[] = [];
  Statuts: any[] = [];

  ResponsableDB: any[] = [];
  StatutDB: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableColumn!: string[];



  readExcelFile(e: any) {
    // Ouvrir l'explorateur de fichier pour selectionner le fichier


    const file = e.target.files[0];
    let fr = new FileReader();

    fr.readAsArrayBuffer(file);

    fr.onload = () => {
      this.fileName = file.name;

      let data = fr.result;
      let workbook = xls.read(data, {type: 'array', cellDates: true});

      const sheetname = workbook.SheetNames[1];

      const sheet1 = workbook.Sheets[sheetname]

      this.excelFileTasks = xls.utils.sheet_to_json(sheet1, {raw: true});
      this.excelFileTasksKeys = Object.keys(this.excelFileTasks[0])

      console.log(this.excelFileTasks[0])
      console.log(Object.values(this.excelFileTasks))

      // Créer un tableau pour stocker les observables
      let tasksObservables: any[] = [];

      // Itérer sur chaque utilisateur
      this.excelFileTasks.forEach((user: any) => {
        // Créer un objet UserData à partir des valeurs de l'utilisateur
        let userData: TaskData = {
          ticket: user['Ticket Jira'],
          description: user['Description'],
          type: user['Type'],
          statut: user['Statut'],
          responsable: user['Responsable'],
          chDev: user['CH.Dev'],
          chiffrage: user['Chiffrage'],
          devTig: user['Dev.Tig'],
          livraisonTig: user['Livraison Tig'],
          dateReponse: user['Date reponse'],
          ast: user['AST'],
          commentaire: user['Commentaire']
        };
        // Créer la tâche pour l'utilisateur
        let taskObservable = this.taskService.createTask(userData).toPromise();
        // Ajouter l'observable à notre tableau
        tasksObservables.push(taskObservable);
      });

// Utiliser forkJoin pour attendre que toutes les tâches soient créées
      forkJoin(tasksObservables).subscribe(results => {
        // Toutes les tâches ont été créées
        console.log('Toutes les tâches ont été créées', results);
        this.ngOnInit();
      }, error => {
        console.error('Duplicata du champ task.ticket', error);
        this.ngOnInit();
      });

    }
    // Réinitialiser la valeur de l'input file
    e.target.value = '';
  }


  constructor(private taskService: TaskService, private responsableService: ResponsableService, private statutService: StatutService) {
    console.log(this.displayedColumns);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();

    this.range.value.start = new Date('01/01/1970');
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      console.log(data.map((item: any) => {
        return item
      }));
      this.dataSource = new MatTableDataSource(data);
      this.taskData = data.map((item: any) => {
        // item.devTig == null ? item.devTig : item.devTig = (new Date(item.devTig).getDate()).toString().padStart(2, '0') + "/" + ((new Date(item.devTig).getMonth() + 1).toString().padStart(2, '0')) + "/" + new Date(item.devTig).getFullYear()
        // item.livraisonTig == null ? item.livraisonTig : item.livraisonTig = (new Date(item.livraisonTig).getDate()).toString().padStart(2, '0') + "/" + ((new Date(item.livraisonTig).getMonth() + 1).toString().padStart(2, '0')) + "/" + new Date(item.livraisonTig).getFullYear()
        // item.dateReponse == null ? item.dateReponse : item.dateReponse = (new Date(item.dateReponse).getDate()).toString().padStart(2, '0') + "/" + ((new Date(item.dateReponse).getMonth() + 1).toString().padStart(2, '0')) + "/" + new Date(item.dateReponse).getFullYear();
        return item
      })

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.Responsables = this.taskData
        .map(task => task.responsable) // Extraire les valeurs de 'responsable'
        .filter((value, index, self) => self.indexOf(value) === index); // Éliminer les doublons
      console.log(this.Responsables);
      this.Types = this.taskData
        .map(task => task.type) // Extraire les valeurs de 'type'
        .filter((value, index, self) => self.indexOf(value) === index); // Éliminer les doublons
      console.log(this.Types);
      this.Statuts = this.taskData
        .map(task => task.statut) // Extraire les valeurs de 'statut'
        .filter((value, index, self) => self.indexOf(value) === index); // Éliminer les doublons
      console.log(this.Statuts);

    });


    this.responsableService.getResponsables().subscribe(data => {
      console.log(data);
      data.forEach((item: any) => {
        this.ResponsableDB.push(item.name);
        console.log(this.ResponsableDB);
      });
    });

    this.statutService.getStatuts().subscribe(data => {
      console.log(data);
      data.forEach((item: any) => {
        this.StatutDB.push(item.name);
        console.log(item.name);
      });
    });

    console.log(this.taskData);
  }

  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.taskData = data;
    });
  }

  getTaskById(id: number) {
    this.taskService.getTaskById(id).subscribe(data => {
      console.log(data);
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  editBoolChange(row: TaskData) {
    row.editMode = !row.editMode;
    if (!row.editMode) {
      this.ngOnInit();
    }
  }

  editTask(row: TaskData) {
    row.editMode = !row.editMode;
    let task: TaskData = {
      "ticket": row.ticket,
      "description": row.description,
      "type": row.type,
      "statut": row.statut,
      "responsable": row.responsable,
      "chDev": row.chDev,
      "chiffrage": row.chiffrage,
      "devTig": row.devTig instanceof Date ? row.devTig : (row.devTig ? new Date(row.devTig) : null),
      "livraisonTig": row.livraisonTig instanceof Date ? row.livraisonTig : (row.livraisonTig ? new Date(row.livraisonTig) : null),
      "dateReponse": row.dateReponse instanceof Date ? row.dateReponse : (row.dateReponse ? new Date(row.dateReponse) : null),
      "ast": row.ast ? row.ast.valueOf() : null,
      "commentaire": row.commentaire
    };
    console.log(this.selectedStatut + " et " + this.selectedResponsable);

    this.taskService.editTask(task).subscribe(data => {
      this.ngOnInit();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  test() {
    this.ngOnInit();
    console.log(this.taskData);
  }


  ticketFilter: string = '';
  descriptionFilter: string = '';
  typeFilter: string = '';
  statutFilter: string = '';
  responsableFilter: string = '';


  ticketForm = new FormControl('');
  descriptionForm = new FormControl('');
  typeSelectForm = new FormControl('');
  statutSelectForm = new FormControl('');
  responsableSelectForm = new FormControl('');
  dateReponseDatePicker = new FormControl('');

  stringDateFormat(date: string): Date {
    const dateParts = date !== undefined ? date.split("/") : ['01', '01', '0001'];
    return new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
  }

  formatDate(date: Date): string {
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }


  applyFilters() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dateReponseStart = this.range.value.start ? this.range.value.start : new Date('01/01/1970');
      const dateReponseEnd = this.range.value.end ? this.range.value.end : new Date();

      const ticketMatch = data.ticket ? data.ticket.toLowerCase().includes(this.ticketForm.value ? this.ticketForm.value : '') : true;
      const descriptionMatch = data.description ? data.description.toLowerCase().includes(this.descriptionForm.value ? this.descriptionForm.value : '') : true;
      const typeMatch = this.typeSelectForm.value!.length > 0 ? this.typeSelectForm.value!.includes(data.type) : true;
      const statutMatch = this.statutSelectForm.value!.length > 0 ? this.statutSelectForm.value!.includes(data.statut) : true;
      const responsableMatch = this.responsableSelectForm.value!.length > 0 ? this.responsableSelectForm.value!.includes(data.responsable) : true;

      const dateResponse = this.stringDateFormat(data.Date_reponse);
      const dateRaponseMatch = this.range.value.start !== null ? dateResponse >= dateReponseStart && dateResponse <= dateReponseEnd : true;

      return ticketMatch && descriptionMatch && typeMatch && statutMatch && responsableMatch && dateRaponseMatch;
    };

    // Trigger the filter to take effect
    this.dataSource.filter = `${this.ticketForm.value} ${this.descriptionForm.value} ${this.typeSelectForm.value} ${this.statutSelectForm.value} ${this.responsableSelectForm.value} ${this.dateReponseDatePicker.value}`;
    console.log(this.dataSource.filter);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters() {
    // Reset form controls
    this.ticketForm.reset('');
    this.typeSelectForm.reset('');
    this.statutSelectForm.reset('');
    this.responsableSelectForm.reset('');
    this.dateReponseDatePicker.reset('');
    this.range.reset();
    this.descriptionForm.reset('');

    // Reset filter variables
    this.ticketFilter = '';
    this.descriptionFilter = '';
    this.typeFilter = '';
    this.statutFilter = '';
    this.responsableFilter = '';

    // Apply filters
    this.dataSource.filter = '';
    this.applyFilters();
  }


  openDialog() {
    const dialogRef = this.dialog.open(TaskDialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openDialogStatut() {
    const dialogRef = this.dialog.open(UserStatutLeaveDialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
  openDialogResponsable() {
    const dialogRef = this.dialog.open(UserResponsableLeaveDialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  readonly dialog = inject(MatDialog);
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  readonly dateGroup = new FormGroup({
    devTig: new FormControl<Date | null>(null),
    livraisonTig: new FormControl<Date | null>(null),
    dateReponse: new FormControl<Date | null>(null),
  });
  readonly selectGroup = new FormGroup({
    statut: new FormControl<string | null>(null),
    responsable: new FormControl<string | null>(null),
  });
}


export interface TaskData {
  "ticket": string;
  "description": string;
  "type": string;
  "statut"?: string | null;
  "responsable"?: string | null;
  "chDev": string;
  "chiffrage": string;
  "devTig": Date | null;
  "livraisonTig": Date | null;
  "dateReponse": Date | null;
  "ast": boolean | null;
  "commentaire": string;
  "editMode"?: boolean;
}
