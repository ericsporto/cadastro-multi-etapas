import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Summary } from './Summary';
import { useFormStore } from '../store/useFormStore';
import { exportToPDF } from '../utils/exportToPDF';

vi.mock('../store/useFormStore');
vi.mock('../utils/exportToPDF');

describe('Summary Component', () => {
  const mockResetForm = vi.fn();

  const mockFormData = {
    fullName: 'Ana Silva',
    birthDate: '1995-05-20',
    cpf: '123.456.789-00',
    phone: '(11) 99999-9999',
    street: 'Rua das Flores, 123',
    neighborhood: 'Centro',
    cep: '01000-000',
    city: 'São Paulo',
    state: 'SP',
    profession: 'Desenvolvedora',
    company: 'Tech Corp',
    salary: 'R$ 8.000,00',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormStore).mockReturnValue({
      formData: mockFormData,
      resetForm: mockResetForm,
    } as unknown as ReturnType<typeof useFormStore>);
  });

  it('should render all form summary data correctly including formatted date', () => {
    render(<Summary />);

    expect(screen.getByText('Resumo das Informações')).toBeInTheDocument();
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    expect(screen.getByText('20/05/1995')).toBeInTheDocument();
    expect(screen.getByText('123.456.789-00')).toBeInTheDocument();
    expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument();
    expect(screen.getByText('Rua das Flores, 123')).toBeInTheDocument();
    expect(screen.getByText('Centro')).toBeInTheDocument();
    expect(screen.getByText('01000-000')).toBeInTheDocument();
    expect(screen.getByText('São Paulo / SP')).toBeInTheDocument();
    expect(screen.getByText('Desenvolvedora')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('R$ 8.000,00')).toBeInTheDocument();
  });

  it('should call exportToPDF utility when clicking export button', () => {
    render(<Summary />);

    const exportBtn = screen.getByRole('button', { name: /exportar em pdf/i });
    fireEvent.click(exportBtn);

    expect(exportToPDF).toHaveBeenCalledTimes(1);
  });

  it('should call resetForm when clicking new registration button', () => {
    render(<Summary />);

    const resetBtn = screen.getByRole('button', { name: /novo cadastro/i });
    fireEvent.click(resetBtn);

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });
});