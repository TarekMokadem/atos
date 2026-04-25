import {AfterViewInit, Component, Inject, Input, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {TaskData} from "../task-management/admin-task-management.component";
import {TaskService} from "../../services/task.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { CalendarSchedulerEvent } from 'angular-calendar-scheduler';


@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.scss'
})
export class CalendrierComponent {
  viewDate: Date = new Date();
  events: CalendarSchedulerEvent[] = [
    {
      id: '1',
      start: new Date(),
      end: new Date(),
      title: 'Event 1',
      content: 'Details de l’événement 1',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
    }
    // Ajoute d'autres événements si nécessaire
  ];

  handleEventClicked(event: CalendarSchedulerEvent): void {
    console.log('Event clicked', event);
  }
}
