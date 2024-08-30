import { seochodongList, seokdongList } from '@/constants/searchResultAddressList';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import AddressList from '../_components/AddressList';

const meta: Meta<typeof AddressList> = {
  title: 'Components/AddressList',
  component: AddressList,
  args: { onClick: fn() },
  decorators: [
    (Story) => (
      <div className="relative min-h-200pxr">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const 서초동: Story = {
  args: {
    address: seochodongList,
  },
};

export const 석동: Story = {
  args: {
    address: seokdongList,
  },
};

export const EmptyList: Story = {
  args: {
    address: [],
  },
};
