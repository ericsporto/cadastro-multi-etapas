import React, { lazy } from 'react';
import { useFormStore } from '../store/useFormStore';

const Step1Personal = lazy(() =>
  import('../components/steps/Step1Personal').then((m) => ({ default: m.Step1Personal }))
);
const Step2Address = lazy(() =>
  import('../components/steps/Step2Address').then((m) => ({ default: m.Step2Address }))
);
const Step3Professional = lazy(() =>
  import('../components/steps/Step3Professional').then((m) => ({ default: m.Step3Professional }))
);
const Summary = lazy(() =>
  import('../components/Summary').then((m) => ({ default: m.Summary }))
);

interface StepConfig {
  id: number;
  title: string;
  component: React.LazyExoticComponent<React.FC>;
}

const STEPS_CONFIG: StepConfig[] = [
  { id: 1, title: 'Dados Pessoais', component: Step1Personal },
  { id: 2, title: 'Endereço', component: Step2Address },
  { id: 3, title: 'Profissional', component: Step3Professional },
  { id: 4, title: 'Resumo', component: Summary },
];

export const useStepForm = () => {
  const { step } = useFormStore();

  const currentStepConfig = STEPS_CONFIG.find((s) => s.id === step) ?? STEPS_CONFIG[0];
  const CurrentStepComponent = currentStepConfig.component;

  const stepTitles = STEPS_CONFIG.map((s) => s.title);

  return {
    step,
    stepTitles,
    CurrentStepComponent,
  };
};