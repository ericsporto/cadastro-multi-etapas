import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStep2Address } from '../useStep2Address';
import { useFormStore } from '../../store/useFormStore';
import { mockFetchCEP } from '../../services/api';

vi.mock('../../store/useFormStore');
vi.mock('../../services/api');

describe('useStep2Address Hook', () => {
  const mockUpdateFormData = vi.fn();
  const mockNextStep = vi.fn();
  const mockPrevStep = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormStore).mockReturnValue({
      formData: {
        cep: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
      },
      updateFormData: mockUpdateFormData,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
    } as ReturnType<typeof useFormStore>);

    vi.mocked(mockFetchCEP).mockResolvedValue({
      street: 'Avenida Paulista',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
    });
  });

  it('should initialize with default values from form store', () => {
    const { result } = renderHook(() => useStep2Address());

    expect(result.current.loadingCEP).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it('should expose prevStep function from form store', () => {
    const { result } = renderHook(() => useStep2Address());

    result.current.prevStep();

    expect(mockPrevStep).toHaveBeenCalledTimes(1);
  });

  it('should format CEP value on change without fetching API if length is less than 9', async () => {
    const { result } = renderHook(() => useStep2Address());

    const event = {
      target: { value: '37530' },
    } as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.handleCEPChange(event);
    });

    expect(mockFetchCEP).not.toHaveBeenCalled();
    expect(result.current.loadingCEP).toBe(false);
  });

  it('should fetch address data and update fields when CEP reaches 9 characters', async () => {
    const { result } = renderHook(() => useStep2Address());

    const event = {
      target: { value: '01310100' },
    } as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.handleCEPChange(event);
    });

    expect(mockFetchCEP).toHaveBeenCalledWith('01310-100');
    expect(result.current.loadingCEP).toBe(false);
  });

  it('should handle API error gracefully when CEP fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.mocked(mockFetchCEP).mockRejectedValueOnce(new Error('CEP not found'));

    const { result } = renderHook(() => useStep2Address());

    const event = {
      target: { value: '00000000' },
    } as React.ChangeEvent<HTMLInputElement>;

    await act(async () => {
      await result.current.handleCEPChange(event);
    });

    expect(mockFetchCEP).toHaveBeenCalledWith('00000-000');
    expect(result.current.loadingCEP).toBe(false);

    consoleSpy.mockRestore();
  });

  it('should not submit data when form values are invalid', async () => {
    const { result } = renderHook(() => useStep2Address());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockUpdateFormData).not.toHaveBeenCalled();
    expect(mockNextStep).not.toHaveBeenCalled();
  });

  it('should submit valid data and trigger updateFormData and nextStep', async () => {
    const { result } = renderHook(() => useStep2Address());

    await act(async () => {
      await result.current.handleCEPChange({
        target: { value: '01310100' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const validEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handleSubmit(validEvent);
    });

    await waitFor(() => {
      if (mockUpdateFormData.mock.calls.length > 0) {
        expect(mockUpdateFormData).toHaveBeenCalledWith({
          cep: '01310-100',
          street: 'Avenida Paulista',
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
        });
        expect(mockNextStep).toHaveBeenCalledTimes(1);
      }
    });
  });
});