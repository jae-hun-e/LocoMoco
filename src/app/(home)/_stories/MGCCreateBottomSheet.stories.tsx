import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Meta, StoryObj } from '@storybook/react';
import MGCCreateBottomSheet from '../_components/MGCCreateBottomSheet';

const meta: Meta<typeof MGCCreateBottomSheet> = {
  title: 'Components/MGCCreateBottomSheet',
  component: MGCCreateBottomSheet,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const 모각코_생성_안내_바텀시트: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>바텀시트 오픈</Button>
        <MGCCreateBottomSheet
          open={open}
          setOpen={setOpen}
        />
      </>
    );
  },
};
