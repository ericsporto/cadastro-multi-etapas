interface AddressResponse {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }

  export const mockFetchCEP = async (cep: string): Promise<AddressResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const cleanCEP = cep.replace(/\D/g, '');
    if (cleanCEP.length !== 8) {
      throw new Error('CEP inválido');
    }

    return {
      street: 'Avenida Paulista',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
    };
  };

  export const mockFetchProfessions = async (): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      'Desenvolvedor(a) Front-End',
      'Desenvolvedor(a) Back-End',
      'Engenheiro(a) de Software',
      'UX/UI Designer',
      'Product Owner',
      'Data Scientist',
    ];
  };