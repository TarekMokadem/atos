import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogContentComponent} from "./component/dialog-content/task-dialog-content.component";
import * as xls from 'xlsx';
import {forkJoin} from "rxjs";
import {TaskService} from "../../services/task.service";
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
export class AdminTaskManagementComponent implements OnInit, AfterViewInit {
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


  constructor(
    private taskService: TaskService,
    private responsableService: ResponsableService,
    private statutService: StatutService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource();
    this.range.value.start = new Date('01/01/1970');
  }

  ngOnInit() {
    this.reloadGridData();
  }

  /** Charge tâches + listes référentiel sans dupliquer les tableaux à chaque appel. */
  private reloadGridData(): void {
    forkJoin({
      tasks: this.taskService.getTasks(),
      responsables: this.responsableService.getResponsables(),
      statuts: this.statutService.getStatuts(),
    }).subscribe({
      next: ({ tasks, responsables, statuts }) => {
        this.ResponsableDB = (responsables ?? []).map((r: { name?: string }) => r.name).filter((n): n is string => !!n && String(n).trim() !== '');
        this.StatutDB = (statuts ?? []).map((s: { name?: string }) => s.name).filter((n): n is string => !!n && String(n).trim() !== '');

        this.dataSource = new MatTableDataSource<TaskData>(tasks as TaskData[]);
        this.taskData = (tasks as TaskData[]).map((item) => ({ ...item }));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        const respFromTasks = this.taskData.map((t) => t.responsable);
        const statFromTasks = this.taskData.map((t) => t.statut);
        const typesFromTasks = this.taskData.map((t) => t.type);

        this.Responsables = this.mergeUniqueStrings(this.ResponsableDB, respFromTasks);
        this.Statuts = this.mergeUniqueStrings(this.StatutDB, statFromTasks);
        this.Types = this.mergeUniqueStrings([], typesFromTasks);

        this.cdr.markForCheck();
      },
      error: (err) => console.error('Chargement tâches / référentiels', err),
    });
  }

  private mergeUniqueStrings(base: string[], extra: (string | null | undefined)[]): string[] {
    const set = new Set<string>(base.map((s) => String(s).trim()).filter(Boolean));
    extra.forEach((v) => {
      if (v != null && String(v).trim() !== '') {
        set.add(String(v).trim());
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'fr'));
  }

  getTasks() {
    this.reloadGridData();
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
    this.taskService.editTask(task).subscribe(() => {
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
  typeSelectForm = new FormControl<string[]>([]);
  statutSelectForm = new FormControl<string[]>([]);
  responsableSelectForm = new FormControl<string[]>([]);
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
      const typeSel = this.typeSelectForm.value ?? [];
      const statutSel = this.statutSelectForm.value ?? [];
      const respSel = this.responsableSelectForm.value ?? [];
      const typeMatch = typeSel.length > 0 ? typeSel.includes(data.type) : true;
      const statutMatch = statutSel.length > 0 ? statutSel.includes(data.statut ?? '') : true;
      const responsableMatch = respSel.length > 0 ? respSel.includes(data.responsable ?? '') : true;

      const dr = data.dateReponse;
      const dateResponse =
        dr instanceof Date
          ? dr
          : dr
            ? this.stringDateFormat(String(dr))
            : new Date('01/01/1970');
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
    this.typeSelectForm.setValue([]);
    this.statutSelectForm.setValue([]);
    this.responsableSelectForm.setValue([]);
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
