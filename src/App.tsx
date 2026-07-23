// src/App.tsx
import React, { Suspense } from 'react';
import { useStepForm } from './hooks/useStepForm';
import { StepIndicator } from './components/ui/StepIndicator';
import { StepSkeleton } from './components/ui/StepSkeleton';

export const App: React.FC = () => {
  const { step, stepTitles, CurrentStepComponent } = useStepForm();

  return (
    <main className="min-h-screen bg-brand-bg text-zinc-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-xl bg-brand-card rounded-2xl shadow-2xl border border-brand-border/80 p-6 sm:p-8 backdrop-blur-sm relative z-10">
        <header className="mb-8 text-center">
          <div className="inline-block mb-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-semibold tracking-wider uppercase">
            Processo Seletivo
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cadastro de Candidato
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Preencha os dados nas etapas abaixo para finalizar a sua aplicação
          </p>
        </header>

        <StepIndicator currentStep={step} steps={stepTitles} />

        <div className="mt-6">
          <Suspense fallback={<StepSkeleton />}>
            <CurrentStepComponent />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default App;