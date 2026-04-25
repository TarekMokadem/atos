import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccessDemande } from 'src/app/models/demande/AccessDemande';
import { AccessDemandeService } from 'src/app/services/access-demande.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

export interface DataElement {
  id:number,
    description:string,
}

const dummyData: DataElement[] = [];

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrl: './demande-list.component.scss'
})
export class DemandeListComponent {

  accessDemandeList : AccessDemande[] = [];
  accessDemandeService : AccessDemandeService = inject(AccessDemandeService);

  displayedColumns: string[] = ['id', 'description'];
  visibleColumns: string[] = [...this.displayedColumns];

  constructor(public dialog: MatDialog){
    this.accessDemandeList = this.accessDemandeService.getAllAccessDemands();
  }

  ngOnInit() {
    this.accessDemandeList = this.accessDemandeService.getAllAccessDemands();
  }

  openPopup(rowData :any): void {
    console.log(rowData);
    this.dialog.open(PopupComponent, {
      data:rowData,
    });
  }

  refreshData(): void {
    this.accessDemandeList = this.accessDemandeService.getAllAccessDemands();
  }



  /*toggleColumn(column: string) {
    const index = this.visibleColumns.indexOf(column);
    if (index >= 0) {
      this.visibleColumns.splice(index, 1);
    } else {
      this.visibleColumns.push(column);
    }
  }

  isColumnVisible(column: string): boolean {
    return this.visibleColumns.includes(column);
  }*/

}
