import { calculateEndDate, dayKey, stripTime } from './leave-date.utils';

describe('leave-date.utils', () => {
  it('calculateEndDate avance au moins d’un jour pour durée 1', () => {
    const start = stripTime(new Date(2025, 5, 9));
    const end = calculateEndDate(start, 1);
    expect(end.getTime()).toBeGreaterThan(start.getTime());
  });

  it('dayKey formate en yyyy-mm-dd local', () => {
    const d = new Date(2025, 8, 7);
    expect(dayKey(d)).toBe('2025-09-07');
  });
});
