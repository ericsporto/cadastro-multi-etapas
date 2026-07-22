import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Select, type Option } from '../Select';

describe('Select Component', () => {
  const mockOptions: Option[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  it('must render label and link it to the select element via id', () => {
    render(<Select label="Role" id="role" options={mockOptions} />);

    const select = screen.getByLabelText(/Role/i);
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('id', 'role');
  });

  it('must fallback to name prop as id when id is not explicitly provided', () => {
    render(<Select label="Seniority" name="seniority" options={mockOptions} />);

    const select = screen.getByLabelText(/Seniority/i);
    expect(select).toHaveAttribute('id', 'seniority');
  });

  it('must render default placeholder option when not loading', () => {
    render(<Select label="State" name="state" options={mockOptions} />);

    expect(screen.getByRole('option', { name: 'Selecione uma opção' })).toBeInTheDocument();
  });

  it('must render loading text placeholder and disable select when isLoading is true', () => {
    render(<Select label="City" name="city" options={mockOptions} isLoading />);

    const select = screen.getByLabelText(/City/i);
    expect(select).toBeDisabled();
    expect(screen.getByRole('option', { name: 'Carregando opções...' })).toBeInTheDocument();
  });

  it('must render all provided options correctly', () => {
    render(<Select label="Level" name="level" options={mockOptions} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockOptions.length + 1); // default placeholder + options
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('must render required asterisk indicator when required is true', () => {
    render(<Select label="Work Model" name="workModel" options={mockOptions} required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('must render error message when error prop is present', () => {
    render(
      <Select
        label="Department"
        name="department"
        options={mockOptions}
        error="Department is required"
      />
    );

    expect(screen.getByText('Department is required')).toBeInTheDocument();
  });

  it('must allow user to select an option', async () => {
    const user = userEvent.setup();
    render(<Select label="Select Item" name="item" options={mockOptions} />);

    const select = screen.getByLabelText(/Select Item/i);
    await user.selectOptions(select, '2');

    expect(select).toHaveValue('2');
  });

  it('must forward ref correctly to the underlying HTML select element', () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select label="Country" name="country" options={mockOptions} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current?.name).toBe('country');
  });

  it('must handle disabled state correctly', () => {
    render(<Select label="Status" name="status" options={mockOptions} disabled />);

    const select = screen.getByLabelText(/Status/i);
    expect(select).toBeDisabled();
    expect(select.className).toContain('opacity-50 cursor-not-allowed');
  });

  it('must apply custom className when passed', () => {
    render(
      <Select
        label="Theme"
        name="theme"
        options={mockOptions}
        className="custom-select"
      />
    );

    const select = screen.getByLabelText(/Theme/i);
    expect(select.className).toContain('custom-select');
  });
});