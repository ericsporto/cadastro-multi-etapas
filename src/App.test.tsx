import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { App } from './App';
import { useStepForm } from './hooks/useStepForm';

vi.mock('./hooks/useStepForm');

const MockCurrentStep: React.FC = () => (
  <div data-testid="mock-step-component">Conteúdo da Etapa</div>
);

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useStepForm).mockReturnValue({
      step: 1,
      stepTitles: ['Dados Pessoais', 'Endereço', 'Profissional', 'Resumo'],
      CurrentStepComponent: MockCurrentStep as unknown as React.LazyExoticComponent<React.FC>,
    });
  });

  it('should render page header and layout correctly', () => {
    render(<App />);

    expect(screen.getByText('Processo Seletivo')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Cadastro de Candidato' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/preencha os dados nas etapas abaixo/i)
    ).toBeInTheDocument();
  });

  it('should render current step component provided by useStepForm', () => {
    render(<App />);

    expect(screen.getByTestId('mock-step-component')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo da Etapa')).toBeInTheDocument();
  });

  it('should pass correct props to StepIndicator', () => {
    render(<App />);

    // Verifica se os títulos passados via hook são refletidos no indicador
    expect(screen.getByText('Dados Pessoais')).toBeInTheDocument();
    expect(screen.getByText('Endereço')).toBeInTheDocument();
    expect(screen.getByText('Profissional')).toBeInTheDocument();
    expect(screen.getByText('Resumo')).toBeInTheDocument();
  });
});