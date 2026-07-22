import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore } from '../store/useFormStore';

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.getState().resetForm();
  });

  it('must initialize with step 1 and empty formData object', () => {
    const state = useFormStore.getState();

    expect(state.step).toBe(1);
    expect(state.formData).toEqual({});
  });

  it('must set step directly when setStep is called', () => {
    useFormStore.getState().setStep(3);

    expect(useFormStore.getState().step).toBe(3);
  });

  it('must increment step by 1 when nextStep is called', () => {
    useFormStore.getState().nextStep();

    expect(useFormStore.getState().step).toBe(2);

    useFormStore.getState().nextStep();

    expect(useFormStore.getState().step).toBe(3);
  });

  it('must decrement step by 1 when prevStep is called', () => {
    useFormStore.getState().setStep(3);

    useFormStore.getState().prevStep();

    expect(useFormStore.getState().step).toBe(2);
  });

  it('must merge new form data into existing formData state', () => {
    useFormStore.getState().updateFormData({ fullName: 'John Doe' });

    expect(useFormStore.getState().formData).toEqual({
      fullName: 'John Doe',
    });

    useFormStore.getState().updateFormData({
      cpf: '123.456.789-00',
      city: 'São Paulo',
    });

    expect(useFormStore.getState().formData).toEqual({
      fullName: 'John Doe',
      cpf: '123.456.789-00',
      city: 'São Paulo',
    });
  });

  it('must overwrite specific fields when updated with new values', () => {
    useFormStore.getState().updateFormData({ fullName: 'John Doe' });
    useFormStore.getState().updateFormData({ fullName: 'Jane Doe' });

    expect(useFormStore.getState().formData.fullName).toBe('Jane Doe');
  });

  it('must reset state back to step 1 and empty formData when resetForm is called', () => {
    useFormStore.getState().setStep(4);
    useFormStore.getState().updateFormData({
      fullName: 'John Doe',
      profession: 'Software Engineer',
    });

    useFormStore.getState().resetForm();

    const state = useFormStore.getState();
    expect(state.step).toBe(1);
    expect(state.formData).toEqual({});
  });
});