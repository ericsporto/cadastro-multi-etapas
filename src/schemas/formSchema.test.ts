import { describe, it, expect } from 'vitest';
import {
  personalDataSchema,
  addressDataSchema,
  professionalDataSchema,
  fullFormSchema,
} from './formSchema';

describe('Form Validation Schemas', () => {
  describe('personalDataSchema', () => {
    it('must validate correct personal data', () => {
      const validData = {
        fullName: 'John Doe',
        birthDate: '1990-01-01',
        cpf: '123.456.789-00',
        phone: '(11) 99999-9999',
      };

      const result = personalDataSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('must fail when fullName has less than 3 characters', () => {
      const invalidData = {
        fullName: 'Jo',
        birthDate: '1990-01-01',
        cpf: '123.456.789-00',
        phone: '(11) 99999-9999',
      };

      const result = personalDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.fullName).toContain(
          'Nome deve ter pelo menos 3 caracteres'
        );
      }
    });

    it('must fail when CPF format is invalid', () => {
      const invalidData = {
        fullName: 'John Doe',
        birthDate: '1990-01-01',
        cpf: '12345678900',
        phone: '(11) 99999-9999',
      };

      const result = personalDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.cpf).toContain('CPF inválido');
      }
    });

    it('must fail when phone length is under 14 characters', () => {
      const invalidData = {
        fullName: 'John Doe',
        birthDate: '1990-01-01',
        cpf: '123.456.789-00',
        phone: '1199999999',
      };

      const result = personalDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.phone).toContain(
          'Telefone inválido'
        );
      }
    });
  });

  describe('addressDataSchema', () => {
    it('must validate correct address data', () => {
      const validData = {
        cep: '01310-100',
        street: 'Avenida Paulista',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
      };

      const result = addressDataSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('must fail when CEP pattern does not match 00000-000', () => {
      const invalidData = {
        cep: '01310100',
        street: 'Avenida Paulista',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
      };

      const result = addressDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.cep).toContain('CEP inválido');
      }
    });

    it('must fail when state length is not exactly 2 characters', () => {
      const invalidData = {
        cep: '01310-100',
        street: 'Avenida Paulista',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SPO',
      };

      const result = addressDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.state).toContain(
          'Estado deve ter 2 letras'
        );
      }
    });
  });

  describe('professionalDataSchema', () => {
    it('must validate correct professional data', () => {
      const validData = {
        profession: 'Software Engineer',
        company: 'Tech Company',
        salary: 'R$ 10.000,00',
      };

      const result = professionalDataSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('must fail when required fields are empty strings', () => {
      const invalidData = {
        profession: '',
        company: '',
        salary: '',
      };

      const result = professionalDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.profession).toContain('Selecione uma profissão');
        expect(errors.company).toContain('Nome da empresa é obrigatório');
        expect(errors.salary).toContain('Salário é obrigatório');
      }
    });
  });

  describe('fullFormSchema', () => {
    it('must validate a complete valid form object combining all schemas', () => {
      const validFullData = {
        fullName: 'John Doe',
        birthDate: '1990-01-01',
        cpf: '123.456.789-00',
        phone: '(11) 99999-9999',
        cep: '01310-100',
        street: 'Avenida Paulista',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        profession: 'Software Engineer',
        company: 'Tech Company',
        salary: 'R$ 10.000,00',
      };

      const result = fullFormSchema.safeParse(validFullData);
      expect(result.success).toBe(true);
    });
  });
});