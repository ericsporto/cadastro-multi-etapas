import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Step1Personal } from '../Step1Personal';
import { useStep1Personal } from '../../../hooks/useStep1Personal';

vi.mock('../../../hooks/useStep1Personal');

describe('Step1Personal Component', () => {
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleCPFChange = vi.fn();
  const mockHandlePhoneChange = vi.fn();
  const mockRegister = vi.fn().mockImplementation((name: string) => ({
    name,
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  }));

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useStep1Personal).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      handleCPFChange: mockHandleCPFChange,
      handlePhoneChange: mockHandlePhoneChange,
    });
  });

  it('must render all input fields and the next step button.', () => {
    render(<Step1Personal />);

    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Próximo Passo/i })
    ).toBeInTheDocument();
  });

  it('must display error messages when validation errors occur', () => {
    vi.mocked(useStep1Personal).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {
        fullName: { type: 'required', message: 'Nome é obrigatório' },
        cpf: { type: 'required', message: 'CPF inválido' },
      },
      handleCPFChange: mockHandleCPFChange,
      handlePhoneChange: mockHandlePhoneChange,
    });

    render(<Step1Personal />);

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('CPF inválido')).toBeInTheDocument();
  });

  it('should trigger the handleCPFChange function when typing in the CPF field', async () => {
    const user = userEvent.setup();
    render(<Step1Personal />);

    const cpfInput = screen.getByLabelText(/CPF/i);
    await user.type(cpfInput, '123');

    expect(mockHandleCPFChange).toHaveBeenCalled();
  });

  it('should trigger the handlePhoneChange function when typing in the Phone field', async () => {
    const user = userEvent.setup();
    render(<Step1Personal />);

    const phoneInput = screen.getByLabelText(/Telefone/i);
    await user.type(phoneInput, '35999');

    expect(mockHandlePhoneChange).toHaveBeenCalled();
  });

  it('must submit the form by clicking the Next Step button.', async () => {
    render(<Step1Personal />);

    const submitButton = screen.getByRole('button', { name: /Próximo Passo/i });
    const form = submitButton.closest('form');

    expect(form).not.toBeNull();

    if (form) {
      fireEvent.submit(form);
    }

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});