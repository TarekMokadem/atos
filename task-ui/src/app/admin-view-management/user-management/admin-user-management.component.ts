import {AfterViewInit, Component, inject, Input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog} from "@angular/material/dialog";
import {UserDialogContentComponent} from "./component/dialog-content/user-dialog-content.component";
import {UserService} from "../../services/user.service";
import {TaskData} from "../task-management/admin-task-management.component";
import {range} from "rxjs";
import {AuthService} from "../../auth/auth.service";


@Component({
  selector: 'app-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss'
})
export class AdminUserManagementComponent implements AfterViewInit  {
  userData: any[] = [];
  displayedColumns: string[] = ['creationDate', 'name', 'email','role', 'equipe','domaine','mobile','action'];
  dataSource: MatTableDataSource<UserData>;
  columnHeader: string[] = ['Date de création', 'Nom', 'Email','Rôle', 'Équipe','Domaine','Mobile'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableColumn!: string[];

  constructor(private userService : UserService, private authService: AuthService) {

    this.dataSource = new MatTableDataSource();

  }
  ngOnInit(): void {

    this.userService.getUsers().subscribe(data => {
      const mappedData = data.map((item: any) => {
        return {
          ...item,
          name: item.firstname + ' ' + item.lastname,
        }
      });

      this.dataSource = new MatTableDataSource(mappedData);
      this.userData = data.map((item: any) => {
        return item
      })

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  editBoolChange(row: UserData) {
    row.editMode = !row.editMode;
    if (!row.editMode) {
      this.ngOnInit();
    }
  }

  editUser(row: UserData) {
    row.editMode = !row.editMode;
    let user: UserData = {
      "creationDate": row.creationDate,
      "name": row.name,
      "firstname": row.name.toString().split(" ")[0],
      "lastname": row.name.toString().split(" ")[1],
      "email": row.email,
      "password": row.password,
      "equipe": row.equipe,
      "domaine": row.domaine,
      "role": row.role,
      "mobile": row.mobile,
      "editMode": row.editMode,
    };

    this.userService.editUser(user).subscribe(data => {
      this.ngOnInit();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserDialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);;
      this.ngOnInit();
    })
  }

  readonly dialog = inject(MatDialog);
  protected readonly range = range;
}

export interface UserData {
  "creationDate": Date | null;
  "name": string;
  "firstname": string;
  "lastname": string;
  "email": string;
  "password": string,
  "equipe"?: string;
  "domaine"?: string;
  "role": string;
  "mobile"?: string;
  "editMode"?: boolean;
}

/*
    private String firstname;
    private String lastname;
    private Date creationDate;
    private String email;
    private String role;

    @Enumerated(EnumType.STRING)
    private Role role;
 */
