import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addressDataSchema } from '../schemas/formSchema';
import { useFormStore } from '../store/useFormStore';
import { maskCEP } from '../utils/masks';
import { mockFetchCEP } from '../services/api';


export type Step2Data = z.infer<typeof addressDataSchema>;

export const useStep2Address = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const [loadingCEP, setLoadingCEP] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(addressDataSchema),
    defaultValues: {
      cep: formData.cep || '',
      street: formData.street || '',
      neighborhood: formData.neighborhood || '',
      city: formData.city || '',
      state: formData.state || '',
    },
  });

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = maskCEP(e.target.value);
    setValue('cep', formattedCEP, { shouldValidate: true });

    if (formattedCEP.length === 9) {
      try {
        setLoadingCEP(true);
        const address = await mockFetchCEP(formattedCEP);

        setValue('street', address.street, { shouldValidate: true });
        setValue('neighborhood', address.neighborhood, { shouldValidate: true });
        setValue('city', address.city, { shouldValidate: true });
        setValue('state', address.state, { shouldValidate: true });
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingCEP(false);
      }
    }
  };

  const onSubmit = (data: Step2Data) => {
    updateFormData(data);
    nextStep();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loadingCEP,
    handleCEPChange,
    prevStep,
  };
};