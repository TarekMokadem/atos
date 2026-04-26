/** Jours fériés (même logique que les écrans congés historiques). */
const publicHolidays: Date[] = [
  new Date('2025-01-01'),
  new Date('2025-01-11'),
  new Date('2025-01-14'),
  new Date('2025-05-01'),
  new Date('2025-07-30'),
  new Date('2025-08-14'),
  new Date('2025-08-20'),
  new Date('2025-08-21'),
  new Date('2025-11-06'),
  new Date('2025-11-18'),
  new Date('2025-04-22'),
  new Date('2025-04-23'),
  new Date('2025-06-28'),
  new Date('2025-06-29'),
  new Date('2025-07-18'),
  new Date('2025-09-16'),
];

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isPublicHoliday(date: Date): boolean {
  return publicHolidays.some(
    (holiday) =>
      holiday.getDate() === date.getDate() &&
      holiday.getMonth() === date.getMonth() &&
      holiday.getFullYear() === date.getFullYear()
  );
}

/**
 * Fin de congé selon la durée en jours ouvrés (week-end et jours fériés exclus du comptage),
 * aligné sur admin-leave-management / leave-management.
 */
export function calculateEndDate(startDate: Date, duration: number): Date {
  const endDate = new Date(startDate);
  let daysAdded = 0;
  while (daysAdded < duration) {
    endDate.setDate(endDate.getDate() + 1);
    if (!isWeekend(endDate) && !isPublicHoliday(endDate)) {
      daysAdded++;
    }
  }
  return endDate;
}

export function stripTime(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function addCalendarDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return stripTime(x);
}

/** Couleur stable par employé (calendrier + légende). */
export function leaveColorForEmploye(name: string): { bg: string; fg: string; border: string } {
  let h = 0;
  const s = name || '?';
  for (let i = 0; i < s.length; i++) {
    h = s.charCodeAt(i) + ((h << 5) - h);
  }
  const hue = Math.abs(h) % 360;
  return {
    bg: `hsla(${hue}, 70%, 90%, 1)`,
    fg: `hsla(${hue}, 85%, 22%, 1)`,
    border: `hsla(${hue}, 65%, 45%, 0.9)`,
  };
}

export function dayKey(d: Date): string {
  const x = stripTime(d);
  const m = x.getMonth() + 1;
  const day = x.getDate();
  return `${x.getFullYear()}-${m < 10 ? '0' : ''}${m}-${day < 10 ? '0' : ''}${day}`;
}

/** Tous les jours calendaires entre début (inclus) et fin (inclus), pour affichage grille. */
export function eachCalendarDayInclusive(start: Date, end: Date): Date[] {
  const out: Date[] = [];
  let cur = stripTime(start);
  const endAt = stripTime(end).getTime();
  while (cur.getTime() <= endAt) {
    out.push(new Date(cur));
    cur = addCalendarDays(cur, 1);
  }
  return out;
}
