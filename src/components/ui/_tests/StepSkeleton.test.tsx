import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StepSkeleton } from '../StepSkeleton';

describe('StepSkeleton Component', () => {
  it('should render the pulse animation wrapper', () => {
    const { container } = render(<StepSkeleton />);

    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('animate-pulse', 'space-y-4');
  });

  it('should render 3 skeleton placeholder bars', () => {
    const { container } = render(<StepSkeleton />);

    const skeletonBars = container.querySelectorAll('.bg-zinc-800\\/50');

    expect(skeletonBars).toHaveLength(3);
  });
});
