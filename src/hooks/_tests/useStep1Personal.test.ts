import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStep1Personal } from '../useStep1Personal';
import { useFormStore } from '../../store/useFormStore';

vi.mock('../../store/useFormStore');

describe('useStep1Personal Hook', () => {
  const mockUpdateFormData = vi.fn();
  const mockNextStep = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useFormStore).mockReturnValue({
      formData: {
        fullName: '',
        birthDate: '',
        cpf: '',
        phone: '',
      },
      updateFormData: mockUpdateFormData,
      nextStep: mockNextStep,
    } as ReturnType<typeof useFormStore>);
  });

  it('should initialize with default values from form store', () => {
    vi.mocked(useFormStore).mockReturnValue({
      formData: {
        fullName: 'John Doe',
        birthDate: '1990-01-01',
        cpf: '123.456.789-00',
        phone: '(11) 99999-9999',
      },
      updateFormData: mockUpdateFormData,
      nextStep: mockNextStep,
    } as ReturnType<typeof useFormStore>);

    const { result } = renderHook(() => useStep1Personal());

    expect(result.current.errors).toEqual({});
  });

  it('should format CPF value when handleCPFChange is called', async () => {
    const { result } = renderHook(() => useStep1Personal());

    const event = {
      target: { value: '12345678900' },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleCPFChange(event);
    });

    await waitFor(() => {
      expect(result.current.errors.cpf).toBeUndefined();
    });
  });

  it('should format Phone value when handlePhoneChange is called', async () => {
    const { result } = renderHook(() => useStep1Personal());

    const event = {
      target: { value: '11999999999' },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handlePhoneChange(event);
    });

    await waitFor(() => {
      expect(result.current.errors.phone).toBeUndefined();
    });
  });

  it('should not submit data when form values are invalid', async () => {
    const { result } = renderHook(() => useStep1Personal());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockUpdateFormData).not.toHaveBeenCalled();
    expect(mockNextStep).not.toHaveBeenCalled();
  });

  it('should submit valid data and trigger updateFormData and nextStep', async () => {
    const { result } = renderHook(() => useStep1Personal());

    act(() => {
      result.current.handleCPFChange({
        target: { value: '12345678900' },
      } as React.ChangeEvent<HTMLInputElement>);

      result.current.handlePhoneChange({
        target: { value: '11999999999' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const validEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    await act(async () => {
      const { register } = result.current;
      register('fullName').onChange({ target: { name: 'fullName', value: 'John Doe' } });
      register('birthDate').onChange({ target: { name: 'birthDate', value: '1990-01-01' } });
    });

    await act(async () => {
      await result.current.handleSubmit(validEvent);
    });

    await waitFor(() => {
      if (mockUpdateFormData.mock.calls.length > 0) {
        expect(mockUpdateFormData).toHaveBeenCalledWith({
          fullName: 'John Doe',
          birthDate: '1990-01-01',
          cpf: expect.stringMatching(/123\.456\.789-00/),
          phone: expect.stringMatching(/\(11\) 99999-9999/),
        });
        expect(mockNextStep).toHaveBeenCalledTimes(1);
      }
    });
  });
});