import { create } from 'zustand';
import type { FullFormData } from '../schemas/formSchema';

interface FormState {
  step: number;
  formData: Partial<FullFormData>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FullFormData>) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  step: 1,
  formData: {},
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ step: 1, formData: {} }),
}));