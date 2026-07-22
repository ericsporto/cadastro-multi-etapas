import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Summary } from './Summary';
import { useFormStore } from '../store/useFormStore';
import html2canvas from 'html2canvas';

vi.mock('../store/useFormStore');
vi.mock('html2canvas', () => ({
  default: vi.fn(),
}));
vi.mock('jspdf', () => {
  const mockPDFInstance = {
    addImage: vi.fn(),
    save: vi.fn(),
  };
  return {
    default: vi.fn(() => mockPDFInstance),
  };
});

describe('Summary Component', () => {
  const mockResetForm = vi.fn();
  const mockFormData = {
    fullName: 'John Doe',
    birthDate: '1990-01-01',
    cpf: '123.456.789-00',
    phone: '(11) 99999-9999',
    street: 'Av. Paulista, 1000',
    neighborhood: 'Bela Vista',
    cep: '01310-100',
    city: 'São Paulo',
    state: 'SP',
    profession: 'Software Engineer',
    company: 'Tech Corp',
    salary: 'R$ 10.000,00',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormStore).mockReturnValue({
      formData: mockFormData,
      resetForm: mockResetForm,
    } as ReturnType<typeof useFormStore>);

    vi.mocked(html2canvas).mockResolvedValue({
      height: 1000,
      width: 800,
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,fake-data'),
    } as unknown as HTMLCanvasElement);
  });

  it('must render all form data correctly from store', () => {
    render(<Summary />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('123.456.789-00')).toBeInTheDocument();
    expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument();

    expect(screen.getByText('Av. Paulista, 1000')).toBeInTheDocument();
    expect(screen.getByText('Bela Vista')).toBeInTheDocument();
    expect(screen.getByText('01310-100')).toBeInTheDocument();
    expect(screen.getByText('São Paulo / SP')).toBeInTheDocument();

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('R$ 10.000,00')).toBeInTheDocument();
  });

  it('must call resetForm when clicking on Novo Cadastro button', async () => {
    const user = userEvent.setup();
    render(<Summary />);

    const resetButton = screen.getByRole('button', { name: /Novo Cadastro/i });
    await user.click(resetButton);

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });
});