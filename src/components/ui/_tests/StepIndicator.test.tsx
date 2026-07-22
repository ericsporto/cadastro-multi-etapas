import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StepIndicator } from '../StepIndicator';

describe('StepIndicator Component', () => {
  const mockSteps = ['Personal', 'Address', 'Professional'];

  it('must render all step labels correctly', () => {
    render(<StepIndicator currentStep={1} steps={mockSteps} />);

    mockSteps.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('must display step numbers when steps are current or pending', () => {
    render(<StepIndicator currentStep={1} steps={mockSteps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('must display checkmark icon for completed steps', () => {
    render(<StepIndicator currentStep={2} steps={mockSteps} />);

    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('must highlight active step label and apply current step styles', () => {
    render(<StepIndicator currentStep={2} steps={mockSteps} />);

    const currentLabel = screen.getByText('Address');
    expect(currentLabel.className).toContain('text-purple-400');
    expect(currentLabel.className).toContain('font-bold');

    const pendingLabel = screen.getByText('Professional');
    expect(pendingLabel.className).toContain('text-zinc-500');
  });

  it('must calculate progress bar width accurately based on current step', () => {
    const { container, rerender } = render(
      <StepIndicator currentStep={1} steps={mockSteps} />
    );

    let progressBar = container.querySelector('div.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '0%' });

    rerender(<StepIndicator currentStep={2} steps={mockSteps} />);
    progressBar = container.querySelector('div.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '50%' });

    rerender(<StepIndicator currentStep={3} steps={mockSteps} />);
    progressBar = container.querySelector('div.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '100%' });
  });
});