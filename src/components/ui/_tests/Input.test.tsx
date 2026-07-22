import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Input } from '../Input';

describe('Input Component', () => {
  it('must render label and link it to the input element via id', () => {
    render(<Input label="Full Name" id="full-name" />);

    const input = screen.getByLabelText(/Full Name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'full-name');
  });

  it('must fallback to name prop as id when id is not explicitly provided', () => {
    render(<Input label="Email Address" name="email" />);

    const input = screen.getByLabelText(/Email Address/i);
    expect(input).toHaveAttribute('id', 'email');
  });

  it('must render required asterisk indicator when required is true', () => {
    render(<Input label="CPF" name="cpf" required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('must render error message and set aria-invalid when error is present', () => {
    render(<Input label="Phone" name="phone" error="Phone is required" />);

    const input = screen.getByLabelText(/Phone/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
  });

  it('must render helperText when present and no error exists', () => {
    render(
      <Input
        label="ZIP Code"
        name="cep"
        helperText="Fetching address details..."
      />
    );

    expect(
      screen.getByText('Fetching address details...')
    ).toBeInTheDocument();
  });

  it('must prioritize error message over helperText if both are provided', () => {
    render(
      <Input
        label="ZIP Code"
        name="cep"
        error="Invalid ZIP Code"
        helperText="Fetching address details..."
      />
    );

    expect(screen.getByText('Invalid ZIP Code')).toBeInTheDocument();
    expect(
      screen.queryByText('Fetching address details...')
    ).not.toBeInTheDocument();
  });

  it('must forward ref correctly to the underlying HTML input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="City" name="city" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.name).toBe('city');
  });

  it('must update value on typing', async () => {
    const user = userEvent.setup();
    render(<Input label="Company" name="company" />);

    const input = screen.getByLabelText(/Company/i);
    await user.type(input, 'Tech Company');

    expect(input).toHaveValue('Tech Company');
  });

  it('must handle disabled state correctly', () => {
    render(<Input label="State" name="state" disabled />);

    const input = screen.getByLabelText(/State/i);
    expect(input).toBeDisabled();
    expect(input.className).toContain('opacity-50 cursor-not-allowed');
  });

  it('must apply custom className when passed', () => {
    render(<Input label="Street" name="street" className="custom-input" />);

    const input = screen.getByLabelText(/Street/i);
    expect(input.className).toContain('custom-input');
  });
});