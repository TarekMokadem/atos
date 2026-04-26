import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  addCalendarDays,
  calculateEndDate,
  dayKey,
  eachCalendarDayInclusive,
  leaveColorForEmploye,
  stripTime,
} from '../../shared/leave-date.utils';

export interface LeaveCalendarSegment {
  id: number;
  employe: string;
  raison: string;
  statut: string;
  duree: number;
  debut: Date;
  fin: Date;
  colors: ReturnType<typeof leaveColorForEmploye>;
}

export interface LeaveCalendarDay {
  date: Date;
  key: string;
  inMonth: boolean;
  isToday: boolean;
  segments: LeaveCalendarSegment[];
}

@Component({
  selector: 'app-leave-calendar',
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveCalendarComponent implements OnChanges {
  @Input() leaves: any[] = [];

  /** Libellé optionnel sous le titre (ex. filtre utilisateur). */
  @Input() subtitle = '';

  viewMonth = new Date();
  weeks: LeaveCalendarDay[][] = [];
  legend: { employe: string; colors: ReturnType<typeof leaveColorForEmploye> }[] = [];

  readonly weekDayLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.viewMonth = stripTime(new Date());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['leaves'] || changes['subtitle']) {
      // Reporté pour éviter ExpressionChangedAfterItHasBeenChecked à l’ouverture de l’onglet MatTab.
      this.scheduleRebuild();
    }
  }

  private scheduleRebuild(): void {
    setTimeout(() => {
      this.rebuild();
    }, 0);
  }

  prevMonth(): void {
    const d = new Date(this.viewMonth);
    d.setMonth(d.getMonth() - 1);
    this.viewMonth = stripTime(d);
    this.rebuild();
  }

  nextMonth(): void {
    const d = new Date(this.viewMonth);
    d.setMonth(d.getMonth() + 1);
    this.viewMonth = stripTime(d);
    this.rebuild();
  }

  goToday(): void {
    this.viewMonth = stripTime(new Date());
    this.rebuild();
  }

  monthTitle(): string {
    return this.viewMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }

  trackWeek(i: number): number {
    return i;
  }

  private rebuild(): void {
    const raw = this.leaves || [];
    const segments: LeaveCalendarSegment[] = raw.map((row) => {
      const jour = row.jour instanceof Date ? row.jour : new Date(row.jour);
      const debut = stripTime(jour);
      const fin = stripTime(calculateEndDate(debut, Number(row.duree) || 0));
      const employe = row.employe ?? '—';
      return {
        id: row.id,
        employe,
        raison: row.raison ?? '',
        statut: row.statut ?? '',
        duree: Number(row.duree) || 0,
        debut,
        fin,
        colors: leaveColorForEmploye(employe),
      };
    });

    const byEmploye = new Map<string, ReturnType<typeof leaveColorForEmploye>>();
    segments.forEach((s) => byEmploye.set(s.employe, s.colors));
    this.legend = Array.from(byEmploye.entries())
      .map(([employe, colors]) => ({ employe, colors }))
      .sort((a, b) => a.employe.localeCompare(b.employe, 'fr'));

    const dayMap = new Map<string, LeaveCalendarSegment[]>();
    segments.forEach((seg) => {
      eachCalendarDayInclusive(seg.debut, seg.fin).forEach((d) => {
        const k = dayKey(d);
        const list = dayMap.get(k) ?? [];
        list.push(seg);
        dayMap.set(k, list);
      });
    });

    const year = this.viewMonth.getFullYear();
    const month = this.viewMonth.getMonth();
    const firstOfMonth = stripTime(new Date(year, month, 1));
    const lastOfMonth = stripTime(new Date(year, month + 1, 0));

    const startOffset = (firstOfMonth.getDay() + 6) % 7;
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(gridStart.getDate() - startOffset);

    const weeks: LeaveCalendarDay[][] = [];
    let cur = stripTime(new Date(gridStart));
    const todayKey = dayKey(new Date());

    for (let w = 0; w < 6; w++) {
      const row: LeaveCalendarDay[] = [];
      for (let c = 0; c < 7; c++) {
        const k = dayKey(cur);
        const inMonth = cur.getMonth() === month;
        const segs = (dayMap.get(k) ?? []).slice().sort((a, b) => a.employe.localeCompare(b.employe, 'fr'));
        row.push({
          date: new Date(cur),
          key: k,
          inMonth,
          isToday: k === todayKey,
          segments: segs,
        });
        cur = addCalendarDays(cur, 1);
      }
      weeks.push(row);
    }

    this.weeks = weeks;
    this.cdr.markForCheck();
  }
}
