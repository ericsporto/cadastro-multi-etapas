import { describe, it, expect } from 'vitest';
import { maskCPF, maskPhone, maskCEP, maskCurrency } from '../masks';

describe('Mask Utilities', () => {
  describe('maskCPF', () => {
    it('must format a full 11-digit CPF string correctly', () => {
      expect(maskCPF('12345678900')).toBe('123.456.789-00');
    });

    it('must apply mask progressively as digits are typed', () => {
      expect(maskCPF('123')).toBe('123');
      expect(maskCPF('1234')).toBe('123.4');
      expect(maskCPF('1234567')).toBe('123.456.7');
      expect(maskCPF('123456789')).toBe('123.456.789');
      expect(maskCPF('1234567890')).toBe('123.456.789-0');
    });

    it('must strip non-digit characters before applying mask', () => {
      expect(maskCPF('123a456b789c00')).toBe('123.456.789-00');
    });

    it('must truncate input to maximum allowed length for CPF', () => {
      expect(maskCPF('12345678900999')).toBe('123.456.789-00');
    });
  });

  describe('maskPhone', () => {
    it('must format a full 11-digit phone number correctly', () => {
      expect(maskPhone('11999998888')).toBe('(11) 99999-8888');
    });

    it('must apply mask progressively as digits are typed', () => {
      expect(maskPhone('11')).toBe('11');
      expect(maskPhone('119')).toBe('(11) 9');
      expect(maskPhone('1199999')).toBe('(11) 99999');
      expect(maskPhone('11999998')).toBe('(11) 99999-8');
    });

    it('must strip non-digit characters before applying phone mask', () => {
      expect(maskPhone('11abc99999xyz8888')).toBe('(11) 99999-8888');
    });

    it('must truncate input to maximum 11 digits', () => {
      expect(maskPhone('119999988881234')).toBe('(11) 99999-8888');
    });
  });

  describe('maskCEP', () => {
    it('must format an 8-digit CEP string correctly', () => {
      expect(maskCEP('01310100')).toBe('01310-100');
    });

    it('must apply mask progressively as digits are typed', () => {
      expect(maskCEP('01310')).toBe('01310');
      expect(maskCEP('013101')).toBe('01310-1');
    });

    it('must strip non-digit characters before applying CEP mask', () => {
      expect(maskCEP('01310abc100')).toBe('01310-100');
    });

    it('must truncate input to maximum 8 digits', () => {
      expect(maskCEP('01310100999')).toBe('01310-100');
    });
  });

  describe('maskCurrency', () => {
    it('must return empty string when input contains no digits', () => {
      expect(maskCurrency('')).toBe('');
      expect(maskCurrency('abc')).toBe('');
    });

    it('must format single and double digits as cents', () => {
      const resultOneCent = maskCurrency('1');
      const resultFiftyCents = maskCurrency('50');

      expect(resultOneCent).toContain('0,01');
      expect(resultFiftyCents).toContain('0,50');
    });

    it('must format whole currency amounts in BRL format correctly', () => {
      const resultTenReais = maskCurrency('1000');
      const resultThousandReais = maskCurrency('100000');

      expect(resultTenReais).toContain('10,00');
      expect(resultThousandReais).toContain('1.000,00');
    });

    it('must handle non-digit inputs by stripping them before calculation', () => {
      const result = maskCurrency('R$ 250,50');
      expect(result).toContain('250,50');
    });
  });
});