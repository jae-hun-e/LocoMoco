import type { Meta, StoryObj } from '@storybook/react';
import Navbar from '../_components/NavBar';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="h-50pxr">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const 지도_페이지: Story = {};

지도_페이지.parameters = {
  nextjs: {
    navigation: {
      pathname: '/',
    },
  },
};

export const 검색_페이지: Story = {};

검색_페이지.parameters = {
  nextjs: {
    navigation: {
      pathname: '/search',
    },
  },
};

export const 채팅_페이지: Story = {};

채팅_페이지.parameters = {
  nextjs: {
    navigation: {
      pathname: '/chat',
    },
  },
};

export const 마이페이지: Story = {};

마이페이지.parameters = {
  nextjs: {
    navigation: {
      pathname: '/mypage',
    },
  },
};
