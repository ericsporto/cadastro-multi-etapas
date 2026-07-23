import { describe, it, expect } from 'vitest';
import { formatDate } from '../formatDate';

describe('formatDate Utility', () => {
  it('should format a valid YYYY-MM-DD date to DD/MM/YYYY', () => {
    const input = '1995-05-20';
    const result = formatDate(input);

    expect(result).toBe('20/05/1995');
  });

  it('should return "-" when dateString is undefined or empty', () => {
    expect(formatDate(undefined)).toBe('-');
    expect(formatDate('')).toBe('-');
  });

  it('should return the original string if it does not match YYYY-MM-DD format', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date');
    expect(formatDate('20/05/1995')).toBe('20/05/1995');
    expect(formatDate('2026')).toBe('2026');
  });

  it('should correctly format boundary days and months', () => {
    expect(formatDate('2026-01-01')).toBe('01/01/2026');
    expect(formatDate('2026-12-31')).toBe('31/12/2026');
  });
});