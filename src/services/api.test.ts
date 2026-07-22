import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mockFetchCEP, mockFetchProfessions } from './api';

describe('API Services', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('mockFetchCEP', () => {
    it('must return address details for a valid 8-digit formatted CEP', async () => {
      const fetchPromise = mockFetchCEP('01310-100');

      vi.advanceTimersByTime(800);

      const data = await fetchPromise;
      expect(data).toEqual({
        street: 'Avenida Paulista',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
      });
    });

    it('must return address details for an unformatted 8-digit CEP string', async () => {
      const fetchPromise = mockFetchCEP('01310100');

      vi.advanceTimersByTime(800);

      const data = await fetchPromise;
      expect(data).toEqual({
        street: 'Avenida Paulista',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
      });
    });

    it('must throw an error when clean CEP length is not equal to 8 digits', async () => {
      const fetchPromise = mockFetchCEP('12345');

      vi.advanceTimersByTime(800);

      await expect(fetchPromise).rejects.toThrow('CEP inválido');
    });
  });

  describe('mockFetchProfessions', () => {
    it('must return a list of profession options after delay', async () => {
      const fetchPromise = mockFetchProfessions();

      vi.advanceTimersByTime(500);

      const professions = await fetchPromise;

      expect(professions).toEqual([
        'Desenvolvedor(a) Front-End',
        'Desenvolvedor(a) Back-End',
        'Engenheiro(a) de Software',
        'UX/UI Designer',
        'Product Owner',
        'Data Scientist',
      ]);
      expect(professions.length).toBeGreaterThan(0);
    });
  });
});