import { z } from 'zod';

export const personalDataSchema = z.object({
  fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  birthDate: z.string().nonempty('Data de nascimento é obrigatória'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
});

export const addressDataSchema = z.object({
  cep: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  street: z.string().min(1, 'Endereço é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 letras'),
});

export const professionalDataSchema = z.object({
  profession: z.string().min(1, 'Selecione uma profissão'),
  company: z.string().min(1, 'Nome da empresa é obrigatório'),
  salary: z.string().min(1, 'Salário é obrigatório'),
});

export const fullFormSchema = personalDataSchema
  .merge(addressDataSchema)
  .merge(professionalDataSchema);

export type FormData = z.infer<typeof fullFormSchema>;