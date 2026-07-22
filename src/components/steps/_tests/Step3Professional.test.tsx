import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Step3Professional } from '../Step3Professional';
import { useFormStore } from '../../../store/useFormStore';
import { mockFetchProfessions } from '../../../services/api';

vi.mock('../../../store/useFormStore');
vi.mock('../../../services/api');

describe('Step3Professional Component', () => {
  const mockUpdateFormData = vi.fn();
  const mockNextStep = vi.fn();
  const mockPrevStep = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormStore).mockReturnValue({
      formData: {
        profession: '',
        company: '',
        salary: '',
      },
      updateFormData: mockUpdateFormData,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
    } as ReturnType<typeof useFormStore>);

    vi.mocked(mockFetchProfessions).mockResolvedValue([
      'Desenvolvedor',
      'Designer',
    ]);
  });

  it('must render all input fields and action buttons after loading options', async () => {
    render(<Step3Professional />);

    expect(screen.getByLabelText(/Profissão/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Empresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Salário Mensal/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Voltar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Finalizar e Ver Resumo/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockFetchProfessions).toHaveBeenCalledTimes(1);
    });
  });

  it('must load and display profession options in the select input', async () => {
    render(<Step3Professional />);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Desenvolvedor' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Designer' })).toBeInTheDocument();
    });
  });

  it('must call prevStep when clicking the Back button', async () => {
    const user = userEvent.setup();
    render(<Step3Professional />);

    const backButton = screen.getByRole('button', { name: /Voltar/i });
    await user.click(backButton);

    expect(mockPrevStep).toHaveBeenCalledTimes(1);
  });

  it('should format salary input when typing', async () => {
    const user = userEvent.setup();
    render(<Step3Professional />);

    const salaryInput = screen.getByLabelText(/Salário Mensal/i) as HTMLInputElement;
    await user.type(salaryInput, '500000');

    expect(salaryInput.value.replace(/\s/g, ' ')).toBe('R$ 5.000,00');
  });

  it('must submit valid data and trigger updateFormData and nextStep', async () => {
    const user = userEvent.setup();
    render(<Step3Professional />);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Desenvolvedor' })).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText(/Profissão/i), 'Desenvolvedor');
    await user.type(screen.getByLabelText(/Empresa/i), 'TechCorp');
    await user.type(screen.getByLabelText(/Salário Mensal/i), '800000');

    const submitButton = screen.getByRole('button', { name: /Finalizar e Ver Resumo/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateFormData).toHaveBeenCalledTimes(1);

      const submittedData = mockUpdateFormData.mock.calls[0][0];
      expect(submittedData.profession).toBe('Desenvolvedor');
      expect(submittedData.company).toBe('TechCorp');
      expect(submittedData.salary.replace(/\s/g, ' ')).toBe('R$ 8.000,00');

      expect(mockNextStep).toHaveBeenCalledTimes(1);
    });
  });
});