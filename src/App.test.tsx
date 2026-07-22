import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { useFormStore } from './store/useFormStore';

vi.mock('./store/useFormStore');

vi.mock('./components/ui/StepIndicator', () => ({
  StepIndicator: ({
    currentStep,
    steps,
  }: {
    currentStep: number;
    steps: string[];
  }) => (
    <div data-testid="step-indicator">
      <span>Step: {currentStep}</span>
      <span>Steps Count: {steps.length}</span>
    </div>
  ),
}));

vi.mock('./components/steps/Step1Personal', () => ({
  Step1Personal: () => <div data-testid="step-1-personal">Step 1 Component</div>,
}));

vi.mock('./components/steps/Step2Address', () => ({
  Step2Address: () => <div data-testid="step-2-address">Step 2 Component</div>,
}));

vi.mock('./components/steps/Step3Professional', () => ({
  Step3Professional: () => (
    <div data-testid="step-3-professional">Step 3 Component</div>
  ),
}));

vi.mock('./components/Summary', () => ({
  Summary: () => <div data-testid="summary-component">Summary Component</div>,
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('must render application header and main titles correctly', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 1 } as ReturnType<
      typeof useFormStore
    >);

    render(<App />);

    expect(screen.getByText('Processo Seletivo')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /Cadastro de Candidato/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Preencha os dados nas etapas abaixo para finalizar a sua aplicação'
      )
    ).toBeInTheDocument();
  });

  it('must render Step1Personal when current step is 1', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 1 } as ReturnType<
      typeof useFormStore
    >);

    render(<App />);

    expect(screen.getByTestId('step-1-personal')).toBeInTheDocument();
    expect(screen.queryByTestId('step-2-address')).not.toBeInTheDocument();
    expect(screen.queryByTestId('step-3-professional')).not.toBeInTheDocument();
    expect(screen.queryByTestId('summary-component')).not.toBeInTheDocument();
  });

  it('must render Step2Address when current step is 2', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 2 } as ReturnType<
      typeof useFormStore
    >);

    render(<App />);

    expect(screen.getByTestId('step-2-address')).toBeInTheDocument();
    expect(screen.queryByTestId('step-1-personal')).not.toBeInTheDocument();
  });

  it('must render Step3Professional when current step is 3', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 3 } as ReturnType<
      typeof useFormStore
    >);

    render(<App />);

    expect(screen.getByTestId('step-3-professional')).toBeInTheDocument();
    expect(screen.queryByTestId('step-1-personal')).not.toBeInTheDocument();
  });

  it('must render Summary component when current step is 4', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 4 } as ReturnType<
      typeof useFormStore
    >);

    render(<App />);

    expect(screen.getByTestId('summary-component')).toBeInTheDocument();
    expect(screen.queryByTestId('step-1-personal')).not.toBeInTheDocument();
  });

  it('must pass correct step number and titles array to StepIndicator component', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 2 } as ReturnType<
      typeof useFormStore
    >);

    render(<App />);

    const stepIndicator = screen.getByTestId('step-indicator');
    expect(stepIndicator).toHaveTextContent('Step: 2');
    expect(stepIndicator).toHaveTextContent('Steps Count: 4');
  });
});