import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormStore } from '../store/useFormStore';
import { personalDataSchema } from '../schemas/formSchema';
import { maskCPF, maskPhone } from '../utils/masks';


export type Step1Data = z.infer<typeof personalDataSchema>;

export const useStep1Personal = () => {
  const { formData, updateFormData, nextStep } = useFormStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      fullName: formData.fullName || '',
      birthDate: formData.birthDate || '',
      cpf: formData.cpf || '',
      phone: formData.phone || '',
    },
  });

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCPF(e.target.value);
    setValue('cpf', masked, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskPhone(e.target.value);
    setValue('phone', masked, { shouldValidate: true });
  };

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    nextStep();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    handleCPFChange,
    handlePhoneChange,
  };
};