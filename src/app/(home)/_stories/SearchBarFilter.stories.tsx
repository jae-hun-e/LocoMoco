import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SearchBarFilter from '../_components/SearchBarFilter';

const meta: Meta<typeof SearchBarFilter> = {
  title: 'Components/SearchBarFilter',
  component: SearchBarFilter,
  args: { setOpen: fn() },
  decorators: [
    (Story) => (
      <div className="min-h-100pxr">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
