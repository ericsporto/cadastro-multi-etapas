import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useStep2Address } from '../../hooks/useStep2Address';

export const Step2Address: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    loadingCEP,
    handleCEPChange,
    prevStep,
  } = useStep2Address();

  const cepRegistration = register('cep');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="CEP"
        placeholder="00000-000"
        error={errors.cep?.message}
        helperText={loadingCEP ? 'Buscando endereço via serviço de CEP...' : ''}
        required
        {...cepRegistration}
        onChange={(e) => {
          cepRegistration.onChange(e);
          handleCEPChange(e);
        }}
      />

      <Input
        label="Endereço"
        placeholder="Rua, Avenida, etc."
        error={errors.street?.message}
        required
        {...register('street')}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Bairro"
          placeholder="Seu bairro"
          error={errors.neighborhood?.message}
          required
          {...register('neighborhood')}
        />

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Input
              label="Cidade"
              placeholder="Cidade"
              error={errors.city?.message}
              required
              {...register('city')}
            />
          </div>
          <Input
            label="UF"
            placeholder="SP"
            maxLength={2}
            error={errors.state?.message}
            required
            {...register('state')}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={prevStep}>
          ← Voltar
        </Button>
        <Button type="submit">Próximo Passo →</Button>
      </div>
    </form>
  );
};
