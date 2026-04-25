import {AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from "@angular/forms";
import {
  LeaveDialogContentComponent
} from "../../admin-view-management/leave-management/component/dialog-content/leave-dialog-content.component";
import {LeaveService} from "../../services/leave.service";
import {LeaveData} from "../../admin-view-management/leave-management/admin-leave-management.component";
import {MatDialog} from "@angular/material/dialog";
import {UserLeaveDialogContentComponent} from "./component/dialog-content/leave-dialog-content.component";
import {UserService} from "../../services/user.service";
import {
  UserStatutLeaveDialogContentComponent
} from "../../admin-view-management/task-management/component/dialog-content-statut/statut-leave-dialog-content.component";
import {
  UserResponsableLeaveDialogContentComponent
} from "../../admin-view-management/task-management/component/dialog-content-responsable/responsable-leave-dialog-content.component";


@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveManagementComponent implements AfterViewInit {
  leaveData: any[] = [];
  displayedColumns: string[] = ['jour', 'duree', 'fin', 'raison','statut', 'dateDemande'];
  dataSource: MatTableDataSource<LeaveData>;
  columnHeader: string[] = ['Début', 'Durée', 'Fin', 'Raison', 'Statut', 'Création'];
  Statut: any[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableColumn!: string[];



  constructor(private leaveService: LeaveService, private userService: UserService) {
    console.log(this.displayedColumns);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();

    this.jourRange.value.start = new Date('01/01/1970');
    this.dateRange.value.start = new Date('01/01/1970');

  }


  ngOnInit() {
    this.userService.getAuthenticatedUser().subscribe((users: any) => {
      this.leaveService.getLeaves().subscribe(data => {
        console.log(data.map((item: any) => item));

        // Filtrer les tâches pour ne garder que celles dont l'employé est égal à users.firstname
        const filteredData = data.filter((item: any) => (item.employe ? item.employe.toLowerCase() : item.employe) === users.firstname.toLowerCase());

        this.dataSource = new MatTableDataSource(filteredData);
        this.leaveData = filteredData.map((item: any) => {

          // Ajouter la duree de jour à la date de jour pour avoir la date de fin
          item.jour = new Date(item.jour);
          item.fin = calculateEndDate(item.jour, item.duree);

          return item
        })

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.Statut = this.leaveData
          .map(task => task.statut) // Extraire les valeurs de 'type'
          .filter((value, index, self) => self.indexOf(value) === index); // Éliminer les doublons
        console.log(this.Statut);

      });
    });
    console.log(this.leaveData);
  }

  jourFilter: string = '';
  raisonFilter: string = '';
  statutFilter: string = '';
  dateFilter: string = '';


  jourDatePicker = new FormControl('');
  raisonForm = new FormControl('');
  statutSelectForm = new FormControl('');
  dateDatePicker = new FormControl('');

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilters() {
    this.dataSource.filterPredicate = (data: LeaveData, filter: string) => {
      const jourStart = this.jourRange.value.start ? this.jourRange.value.start : new Date('01/01/1970');
      const jourEnd = this.jourRange.value.end ? this.jourRange.value.end : new Date();

      const dateStart = this.dateRange.value.start ? this.dateRange.value.start : new Date('01/01/1970');
      const dateEnd = this.dateRange.value.end ? this.dateRange.value.end : new Date();


      // const jour = this.stringDateFormat(data.jour);
      // const jourMatch = this.jourRange.value.start !== null ? jour >= jourStart && jour <= jourEnd : true;
      const raisonMatch = data.raison ? data.raison.toLowerCase().includes(this.raisonForm.value ? this.raisonForm.value?.toLowerCase() : '') : true;
      const statutMatch = this.statutSelectForm.value!.length > 0 ? this.statutSelectForm.value!.includes(data.statut) : true;

      // const date = this.stringDateFormat(this.transformDateFormat(data.dateDemande));
      //console.log(date);
      // const dateMatch = this.dateRange.value.start !== null ? date >= dateStart && date <= dateEnd : true;

      return raisonMatch && statutMatch /*&&  jourMatch && dateMatch*/;
    };

    // Trigger the filter to take effect
    this.dataSource.filter = `${this.jourDatePicker.value} ${this.raisonForm.value} ${this.statutSelectForm.value} ${this.dateDatePicker.value}`;
    console.log(this.dataSource.filter);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters() {
    // Reset form controls
    this.jourRange.reset();
    this.raisonForm.reset('');
    this.statutSelectForm.reset('');
    this.dateRange.reset();

    // Reset filter variables
    this.jourFilter = '';
    this.raisonFilter = '';
    this.statutFilter = '';
    this.dateFilter = '';

    // Apply filters
    this.dataSource.filter = '';
    this.applyFilters();
  }


  openDialog() {
    const dialogRef = this.dialog.open(UserLeaveDialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }

  readonly dialog = inject(MatDialog);
  readonly jourRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  readonly dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}

export interface UserData {
  "Jour": string;
  "Raison": string;
  "Statut": string;
  "DateDemande": string;
}
// Add this list of public holidays in the LeaveManagementComponent
const publicHolidays = [
  new Date('2025-01-01'), // New Year's Day
  new Date('2025-01-11'), // Independence Manifesto Day
  new Date('2025-01-14'), // Amazigh New Year's Day
  new Date('2025-05-01'), // Labor Day
  new Date('2025-07-30'), // Throne Day
  new Date('2025-08-14'), // Oued Ed-Dahab Day
  new Date('2025-08-20'), // Revolution Day
  new Date('2025-08-21'), // Youth Day
  new Date('2025-11-06'), // Green March Day
  new Date('2025-11-18'), // Independence Day
  // Islamic holidays (dates vary each year)
  new Date('2025-04-22'), // Eid al-Fitr
  new Date('2025-04-23'), // Eid al-Fitr
  new Date('2025-06-28'), // Eid al-Adha
  new Date('2025-06-29'), // Eid al-Adha
  new Date('2025-07-18'), // Islamic New Year
  new Date('2025-09-16'), // Prophet's Birthday
];
// Function to check if a date is a weekend
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

// Function to check if a date is a public holiday
function isPublicHoliday(date: Date): boolean {
  return publicHolidays.some(holiday =>
    holiday.getDate() === date.getDate() &&
    holiday.getMonth() === date.getMonth() &&
    holiday.getFullYear() === date.getFullYear()
  );
}

// Function to calculate the end date considering weekends and public holidays
function calculateEndDate(startDate: Date, duration: number): Date {
  let endDate = new Date(startDate);
  let daysAdded = 0;

  while (daysAdded < duration) {
    endDate.setDate(endDate.getDate() + 1);
    if (!isWeekend(endDate) && !isPublicHoliday(endDate)) {
      daysAdded++;
    }
  }

  return endDate;
}
