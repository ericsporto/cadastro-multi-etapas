import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { professionalDataSchema } from '../../schemas/formSchema';
import { useFormStore } from '../../store/useFormStore';
import { Input } from '../ui/Input';
import { Select, type Option } from '../ui/Select';
import { Button } from '../ui/Button';
import { maskCurrency } from '../../utils/masks';
import { mockFetchProfessions } from '../../services/api';
import { z } from 'zod';

type Step3Data = z.infer<typeof professionalDataSchema>;

export const Step3Professional: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const [professions, setProfessions] = useState<Option[]>([]);
  const [loadingProfessions, setLoadingProfessions] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(professionalDataSchema),
    defaultValues: {
      profession: formData.profession || '',
      company: formData.company || '',
      salary: formData.salary || '',
    },
  });

  useEffect(() => {
    const loadProfessions = async () => {
      try {
        const list = await mockFetchProfessions();
        setProfessions(list.map((p) => ({ label: p, value: p })));
      } finally {
        setLoadingProfessions(false);
      }
    };
    loadProfessions();
  }, []);

  const onSubmit = (data: Step3Data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Profissão"
        options={professions}
        isLoading={loadingProfessions}
        error={errors.profession?.message}
        required
        {...register('profession')}
      />

      <Input
        label="Empresa"
        autoComplete="organization"
        placeholder="Nome da empresa"
        error={errors.company?.message}
        required
        {...register('company')}
      />

      <Input
        label="Salário Mensal"
        autoComplete="amount"
        placeholder="R$ 0,00"
        error={errors.salary?.message}
        required
        {...register('salary')}
        onChange={(e) => setValue('salary', maskCurrency(e.target.value), { shouldValidate: true })}
      />

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={prevStep}>
          ← Voltar
        </Button>
        <Button type="submit">Finalizar e Ver Resumo ✨</Button>
      </div>
    </form>
  );
};