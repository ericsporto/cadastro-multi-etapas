import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStepForm } from '../useStepForm';
import { useFormStore } from '../../store/useFormStore';

vi.mock('../../store/useFormStore');

vi.mock('../../components/steps/Step1Personal', () => ({
  Step1Personal: () => null,
}));
vi.mock('../../components/steps/Step2Address', () => ({
  Step2Address: () => null,
}));
vi.mock('../../components/steps/Step3Professional', () => ({
  Step3Professional: () => null,
}));
vi.mock('../../components/Summary', () => ({
  Summary: () => null,
}));

describe('useStepForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return stepTitles array with all form stages', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 1 });

    const { result } = renderHook(() => useStepForm());

    expect(result.current.stepTitles).toEqual([
      'Dados Pessoais',
      'Endereço',
      'Profissional',
      'Resumo',
    ]);
  });

  it('should return correct step number and Component for step 1', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 1 });

    const { result } = renderHook(() => useStepForm());

    expect(result.current.step).toBe(1);
    expect(result.current.CurrentStepComponent).toBeDefined();
  });

  it('should update CurrentStepComponent when step changes in store', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 1 });

    const { result, rerender } = renderHook(() => useStepForm());
    const Step1Component = result.current.CurrentStepComponent;

    vi.mocked(useFormStore).mockReturnValue({ step: 2 });
    rerender();

    const Step2Component = result.current.CurrentStepComponent;

    expect(result.current.step).toBe(2);
    expect(Step2Component).not.toBe(Step1Component);
  });

  it('should fallback to first step config if store contains an out-of-bounds step', () => {
    vi.mocked(useFormStore).mockReturnValue({ step: 99 });

    const { result } = renderHook(() => useStepForm());

    expect(result.current.CurrentStepComponent).toBeDefined();
  });
});