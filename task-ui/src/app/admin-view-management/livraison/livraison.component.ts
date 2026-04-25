import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {TaskData} from "../task-management/admin-task-management.component";
import {TaskService} from "../../services/task.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export interface DataElement {

  subject: string;
  id: number;
  createdDate: string;
  updatedDate: string;
  status: string;
}

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrl: './livraison.component.scss'
})
export class LivraisonComponent implements AfterViewInit {
  taskData: any[] = [];
  displayedColumns: string[] = ['ticket', 'description', 'type', 'statut', 'responsable', 'chDev', 'chiffrage', 'devTig', 'livraisonTig', 'dateReponse', 'ast', 'commentaire'];
  dataSource: MatTableDataSource<TaskData>;
  columnHeader: string[] = ['Ticket Jira', 'Description', 'Type', 'Statut', 'Responsable', 'CH.Dev', 'Chiffrage', 'Dev.Tig', 'Livraison Tig', 'Date reponse', 'AST', 'Commentaire'];
  dataSourceToday: MatTableDataSource<TaskData> = new MatTableDataSource();
  dataSourceTomorrow: MatTableDataSource<TaskData> = new MatTableDataSource();
  dataSourceThisWeek: MatTableDataSource<TaskData> = new MatTableDataSource();
  dataSourceThisMonth: MatTableDataSource<TaskData> = new MatTableDataSource();
  dataSourceOverdue: MatTableDataSource<TaskData> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() tableColumn!: string[];


  constructor(private taskService: TaskService) {
    console.log(this.displayedColumns);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
      const tasksForTodayAndTomorrow = [...this.getTasksForToday(), ...this.getTasksForTomorrow()];
      this.dataSourceToday = new MatTableDataSource(tasksForTodayAndTomorrow);
      this.dataSourceTomorrow = new MatTableDataSource(this.getTasksForTomorrow());
      this.dataSourceThisWeek = new MatTableDataSource(this.getTasksForThisWeek());
      this.dataSourceThisMonth = new MatTableDataSource(this.getTasksForThisMonth());
      this.dataSourceOverdue = new MatTableDataSource(this.getOverdueTasks());
      console.log(new Date());
      const list = [this.dataSourceToday, this.dataSourceTomorrow, this.dataSourceThisWeek, this.dataSourceThisMonth, this.dataSourceOverdue];
      list.forEach((dataSource: MatTableDataSource<TaskData>) => {
        console.log(dataSource);
      });

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    });
    console.log(this.taskData);
  }
  getTasksForToday() {
    const today = new Date();
    return this.taskData.filter(task => {
      const taskDate = new Date(task.livraisonTig);
      return taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear();
    });
  }

  getTasksForTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this.taskData.filter(task => {
      const taskDate = new Date(task.livraisonTig);
      return taskDate.getDate() === tomorrow.getDate() &&
        taskDate.getMonth() === tomorrow.getMonth() &&
        taskDate.getFullYear() === tomorrow.getFullYear();
    });
  }

  getTasksForThisWeek() {
    const now = new Date();
    const startOfWeek = new Date();
    const endOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() + 2);
    endOfWeek.setDate(startOfWeek.getDate() + 5);
    return this.taskData.filter(task => {
      const taskDate = new Date(task.livraisonTig);
      console.log(task.description,"date of task: "+taskDate,"startOfWeek: "+startOfWeek, "endOfWeek: "+endOfWeek,taskDate >= startOfWeek && taskDate <= endOfWeek);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
  }

  getTasksForThisMonth() {
    const now = new Date();
    const startOfMonth = new Date();
    const endOfMonth = new Date();
    startOfMonth.setDate(now.getDate() + 7);
    endOfMonth.setDate(now.getDate() + 29);
    return this.taskData.filter(task => {
      const taskDate = new Date(task.livraisonTig);
      return taskDate > startOfMonth && taskDate <= endOfMonth
    });
  }

  getOverdueTasks() {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    return this.taskData.filter(task => {
      const taskDate = new Date(task.livraisonTig);
      //console.log(task,taskDate,yesterday);
      return (taskDate < yesterday) && (task.livraisonTig != null);
    });
  }
}
