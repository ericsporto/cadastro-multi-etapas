import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useStep1Personal } from '../../hooks/useStep1Personal';

export const Step1Personal: React.FC = () => {
  const { register, handleSubmit, errors, handleCPFChange, handlePhoneChange } =
    useStep1Personal();

  const cpfRegistration = register('cpf');
  const phoneRegistration = register('phone');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome Completo"
        placeholder="Ex: João da Silva"
        error={errors.fullName?.message}
        required
        {...register('fullName')}
      />

      <Input
        label="Data de Nascimento"
        type="date"
        error={errors.birthDate?.message}
        required
        {...register('birthDate')}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          error={errors.cpf?.message}
          required
          {...cpfRegistration}
          onChange={(e) => {
            cpfRegistration.onChange(e);
            handleCPFChange(e);
          }}
        />

        <Input
          label="Telefone"
          placeholder="(00) 00000-0000"
          error={errors.phone?.message}
          required
          {...phoneRegistration}
          onChange={(e) => {
            phoneRegistration.onChange(e);
            handlePhoneChange(e);
          }}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Próximo Passo →</Button>
      </div>
    </form>
  );
};