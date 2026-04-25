import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface UserData {
  "Creation_Date": string;
  "Name": string;
  "Email": string;
}

/** Constants used to fill up our data base. */

// Liste des jours fériés (colonne Jour)
const Creation_Date: string[] = [
  '01/01/2024',
  '11/01/2024',
  '01/05/2024',
  '10/04/2024',
  '11/04/2024',
  '18/06/2024',
  '19/06/2024',
  '30/07/2024',
  '08/07/2024',
  '14/08/2024',
  '20/08/2024',
  '21/08/2024',
  '17/09/2024',
  '18/09/2024',
  '06/11/2024',
  '18/11/2024'
];

// Liste des fêtes (colonne Fête)
const Name: string[] = [
  'John Doe',
  'Travor Franck',
  'Francis Ford',
  'Kenny West',
  'Mickael Jackson',
  'Nina Simone',
  "Thomas Moreau",
  "Amélie Petit",
  "Antoine Roux",
  "Marie Garnier",
  "Luc Bernard",
  "Isabelle Robert",
  "Louis Dubois",
  "Elodie Bertrand",
  "Patrick Lefevre",
  "Catherine Girard",
];

// Liste des jours fériés en version lisible (colonne Jour, texte complet)
const Email: string[] = [
  'john.doe@atos.net',
  'trevor.francis@atos.net',
  'francis.ford@atos.net',
  'kenny.west@atos.net',
  'mickael.jackson@atos.net',
  'nina.simone@atos.net',
  "thomas.moreau@atos.net",
  "amelie.petit@atos.net",
  "antoine.roux@atos.net",
  "marie.garnier@atos.net",
  "luc.bernard@atos.net",
  "isabelle.robert@atos.net",
  "louis.dubois@atos.net",
  "elodie.bertrand@atos.net",
  "patrick.lefevre@atos.net",
  "catherine.girard@atos.net",
];


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements AfterViewInit  {

  displayedColumns: string[] = ['Jour', 'Fete', 'Date'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableColumn!: string[];

  constructor() {
    // Create 100 users
    const users = Array.from({length: Name.length}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {

  return {
    "Creation_Date": Creation_Date[id],
    "Name": Name[id],
    "Email": Email[id],

  };

}
