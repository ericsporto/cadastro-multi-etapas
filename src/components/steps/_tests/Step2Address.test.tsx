import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Step2Address } from '../Step2Address';
import { useStep2Address } from '../../../hooks/useStep2Address';

vi.mock('../../../hooks/useStep2Address');

describe('Step2Address Component', () => {
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleCEPChange = vi.fn();
  const mockPrevStep = vi.fn();
  const mockRegister = vi.fn().mockImplementation((name: string) => ({
    name,
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  }));

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useStep2Address).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      loadingCEP: false,
      handleCEPChange: mockHandleCEPChange,
      prevStep: mockPrevStep,
    });
  });

  it('must render all input fields and action buttons', () => {
    render(<Step2Address />);

    expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Endereço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bairro/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/UF/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Voltar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Próximo Passo/i })
    ).toBeInTheDocument();
  });

  it('must display helper text when loading CEP', () => {
    vi.mocked(useStep2Address).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      loadingCEP: true,
      handleCEPChange: mockHandleCEPChange,
      prevStep: mockPrevStep,
    });

    render(<Step2Address />);

    expect(
      screen.getByText(/Buscando endereço via serviço de CEP.../i)
    ).toBeInTheDocument();
  });

  it('must display error messages when validation errors occur', () => {
    vi.mocked(useStep2Address).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {
        cep: { type: 'required', message: 'CEP é obrigatório' },
        street: { type: 'required', message: 'Endereço é obrigatório' },
      },
      loadingCEP: false,
      handleCEPChange: mockHandleCEPChange,
      prevStep: mockPrevStep,
    });

    render(<Step2Address />);

    expect(screen.getByText('CEP é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Endereço é obrigatório')).toBeInTheDocument();
  });

  it('should trigger the handleCEPChange function when typing in the CEP field', async () => {
    const user = userEvent.setup();
    render(<Step2Address />);

    const cepInput = screen.getByLabelText(/CEP/i);
    await user.type(cepInput, '37530');

    expect(mockHandleCEPChange).toHaveBeenCalled();
  });

  it('must call prevStep when clicking the Back button', async () => {
    const user = userEvent.setup();
    render(<Step2Address />);

    const backButton = screen.getByRole('button', { name: /Voltar/i });
    await user.click(backButton);

    expect(mockPrevStep).toHaveBeenCalledTimes(1);
  });

  it('must submit the form by clicking the Next Step button', () => {
    render(<Step2Address />);

    const submitButton = screen.getByRole('button', { name: /Próximo Passo/i });
    const form = submitButton.closest('form');

    expect(form).not.toBeNull();

    if (form) {
      fireEvent.submit(form);
    }

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});