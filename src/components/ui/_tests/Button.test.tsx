import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button Component', () => {
  it('must render children content correctly', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: /Click me/i })).toBeInTheDocument();
  });

  it('must apply primary variant styles by default', () => {
    render(<Button>Default</Button>);

    const button = screen.getByRole('button', { name: /Default/i });
    expect(button.className).toContain('from-purple-600');
  });

  it('must apply secondary variant styles when specified', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button', { name: /Secondary/i });
    expect(button.className).toContain('bg-brand-muted');
  });

  it('must apply outline variant styles when specified', () => {
    render(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole('button', { name: /Outline/i });
    expect(button.className).toContain('bg-transparent');
  });

  it('must merge custom className with base styles', () => {
    render(<Button className="custom-class">With Class</Button>);

    const button = screen.getByRole('button', { name: /With Class/i });
    expect(button.className).toContain('custom-class');
    expect(button.className).toContain('inline-flex');
  });

  it('must trigger onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clickable</Button>);

    const button = screen.getByRole('button', { name: /Clickable/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('must be disabled when disabled prop is true', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button', { name: /Disabled/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('must render spinner and loading text when isLoading is true', () => {
    render(<Button isLoading>Loading State</Button>);

    expect(screen.getByText(/Aguarde.../i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading State/i)).not.toBeInTheDocument();
  });

  it('must be disabled when isLoading is true', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button isLoading onClick={handleClick}>
        Submit
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});