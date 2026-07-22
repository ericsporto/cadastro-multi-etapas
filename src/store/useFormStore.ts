import { create } from 'zustand';

interface FormState {
  step: number;
  formData: Partial<FormData>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
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