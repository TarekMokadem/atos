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
import {calculateEndDate} from "../../shared/leave-date.utils";
import {catchError, finalize, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";


@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveManagementComponent implements OnInit, AfterViewInit {
  leaveData: any[] = [];
  displayedColumns: string[] = ['jour', 'duree', 'fin', 'raison','statut', 'dateDemande'];
  dataSource: MatTableDataSource<LeaveData>;
  columnHeader: string[] = ['Début', 'Durée', 'Fin', 'Raison', 'Statut', 'Création'];
  Statut: any[] = [];
  loading = false;
  loadError: string | null = null;
  leaveTabIndex = 0;
  calendarSubtitle = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableColumn!: string[];



  constructor(
    private leaveService: LeaveService,
    private userService: UserService,
    private readonly cdr: ChangeDetectorRef
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();

    this.jourRange.value.start = new Date('01/01/1970');
    this.dateRange.value.start = new Date('01/01/1970');

  }


  ngOnInit() {
    this.refreshLeaves();
  }

  private refreshLeaves(): void {
    this.loading = true;
    this.loadError = null;
    this.cdr.markForCheck();
    this.userService
      .getAuthenticatedUser()
      .pipe(
        switchMap((users: any) => {
          const fn = (users?.firstname ?? '').toString().trim();
          const ln = (users?.lastname ?? '').toString().trim();
          const full = `${fn} ${ln}`.trim().toLowerCase();
          const subtitle = full
            ? `Vos congés (profil : ${fn}${ln ? ' ' + ln : ''}).`
            : 'Vos congés et demandes.';
          return this.leaveService.getLeaves().pipe(
            map((data: any[]) =>
              data.filter((item: any) => {
                const emp = (item.employe ?? '').toString().toLowerCase().trim();
                return (
                  emp === full ||
                  emp === fn.toLowerCase() ||
                  (ln && emp === `${fn} ${ln}`.toLowerCase())
                );
              })
            ),
            map((filteredData: LeaveData[]) => ({ filteredData, subtitle }))
          );
        }),
        catchError(() => {
          this.loadError = 'Impossible de charger vos congés.';
          return of({ filteredData: [] as LeaveData[], subtitle: 'Vos congés et demandes.' });
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(({ filteredData, subtitle }) => {
        this.calendarSubtitle = subtitle;
        this.dataSource = new MatTableDataSource<LeaveData>(filteredData);
        this.leaveData = filteredData.map((item: any) => {
          item.jour = new Date(item.jour);
          item.fin = calculateEndDate(item.jour, item.duree);
          return item;
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.Statut = this.leaveData
          .map((task) => task.statut)
          .filter((value, index, self) => self.indexOf(value) === index);
        this.cdr.markForCheck();
      });
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

    dialogRef.afterClosed().subscribe(() => {
      this.refreshLeaves();
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
  Jour: string;
  Raison: string;
  Statut: string;
  DateDemande: string;
}
