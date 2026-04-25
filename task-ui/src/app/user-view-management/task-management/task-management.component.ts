import {AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {UserTaskDialogContentComponent} from "./component/dialog-content/user-task-dialog-content.component";
import * as xls from 'xlsx';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../../services/user.service";
import {
  UserStatutLeaveDialogContentComponent
} from "../../admin-view-management/task-management/component/dialog-content-statut/statut-leave-dialog-content.component";
import {
  UserResponsableLeaveDialogContentComponent
} from "../../admin-view-management/task-management/component/dialog-content-responsable/responsable-leave-dialog-content.component";

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskManagementComponent implements AfterViewInit {
  fileName = '';
  taskData: any[] = [];
  excelFileTasks: any;
  excelFileTasksKeys: string[] = [];
  displayedColumns: string[] = ['ticket', 'description', 'type', 'statut', 'chDev', 'chiffrage', 'devTig', 'livraisonTig', 'dateReponse', 'ast', 'commentaire', 'action'];
  dataSource: MatTableDataSource<TaskData>;
  columnHeader: string[] = ['Ticket Jira', 'Description', 'Type', 'Statut', 'CH.Dev', 'Chiffrage', 'Dev.Tig', 'Livraison Tig', 'Date reponse', 'AST', 'Commentaire'];
  Responsables: any[] = [];
  Types: any[] = [];
  Statuts: any[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableColumn!: string[];


  readExcelFile(e: any) {
    // Ouvrir l'explorateur de fichier pour selectionner le fichier


    const file = e.target.files[0];
    let fr = new FileReader();

    fr.readAsArrayBuffer(file);

    fr.onload = () => {

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


  constructor(private taskService: TaskService, private authService: AuthService, private userService: UserService) {
    console.log(this.displayedColumns);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();

    this.range.value.start = new Date('01/01/1970');
  }

  ngOnInit() {
    this.userService.getAuthenticatedUser().subscribe((users: any) => {
      console.log(users);
      this.taskService.getTasks().subscribe(data => {
        console.log(data.map((item: any) => {
          return item
        }));

        // Filtrer les tâches pour ne garder que celles dont le responsable est égal à users.firstname
        const filteredData = data.filter((item: any) => (item.responsable == null ? item.responsable : item.responsable.toLowerCase()) === users.firstname.toLowerCase());

        this.dataSource = new MatTableDataSource(filteredData);

        this.taskData = filteredData.map((item: any) => {
          return item
        })
        console.log(this.taskData[0].responsable);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.Types = this.taskData
          .map(task => task.type) // Extraire les valeurs de 'type'
          .filter((value, index, self) => self.indexOf(value) === index && value != null); // Éliminer les doublons
        console.log(this.Types);
        this.Statuts = this.taskData
          .map(task => task.statut) // Extraire les valeurs de 'statut'
          .filter((value, index, self) => self.indexOf(value) === index && value != null); // Éliminer les doublons
        console.log(this.Statuts);

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


  ticketForm = new FormControl('');
  descriptionForm = new FormControl('');
  typeSelectForm = new FormControl('');
  statutSelectForm = new FormControl('');
  dateReponseDatePicker = new FormControl('');


  applyFilters() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dateReponseStart = this.range.value.start ? this.range.value.start : new Date('01/01/1970');
      const dateReponseEnd = this.range.value.end ? this.range.value.end : new Date();

      const ticketMatch = data.ticket ? data.ticket.toLowerCase().includes(this.ticketForm.value ? this.ticketForm.value : '') : true;
      const descriptionMatch = data.description ? data.description.toLowerCase().includes(this.descriptionForm.value ? this.descriptionForm.value : '') : true;
      const typeMatch = this.typeSelectForm.value!.length > 0 ? this.typeSelectForm.value!.includes(data.type) : true;
      const statutMatch = this.statutSelectForm.value!.length > 0 ? this.statutSelectForm.value!.includes(data.statut) : true;

      const dateResponse = data.Date_reponse;
      const dateRaponseMatch = this.range.value.start !== null ? dateResponse >= dateReponseStart && dateResponse <= dateReponseEnd : true;

      return ticketMatch && descriptionMatch && typeMatch && statutMatch && dateRaponseMatch;
    };

    // Trigger the filter to take effect
    this.dataSource.filter = `${this.ticketForm.value} ${this.descriptionForm.value} ${this.typeSelectForm.value} ${this.statutSelectForm.value} ${this.dateReponseDatePicker.value}`;
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
    this.dateReponseDatePicker.reset('');
    this.range.reset();
    this.descriptionForm.reset('');

    // Reset filter variables
    this.ticketFilter = '';
    this.descriptionFilter = '';
    this.typeFilter = '';
    this.statutFilter = '';

    // Apply filters
    this.dataSource.filter = '';
    this.applyFilters();
  }


  openDialog() {
    const dialogRef = this.dialog.open(UserTaskDialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
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
}

export interface TaskData {
  "ticket": string;
  "description": string;
  "type": string;
  "statut": string;
  "responsable": string;
  "chDev": string;
  "chiffrage": string;
  "devTig": Date | null;
  "livraisonTig": Date | null;
  "dateReponse": Date | null;
  "ast": boolean | null;
  "commentaire": string;
  "editMode"?: boolean;
}
