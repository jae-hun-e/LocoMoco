import CreateBtn from '@/app/_components/CreateBtn';
import render from '@/libs/test/render';
import { removeItem, setItem } from '@/utils/storage';
import { screen } from '@testing-library/react';

const mockPush = vi.fn();

vi.mock('next/navigation', async () => {
  const original = await vi.importActual('next/navigation');

  return {
    ...original,
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

describe('로그인 상태인 경우', () => {
  it('버튼 클릭시 모각코, 번개모각코 생성 버튼이 나타난다.', async () => {
    setItem(localStorage, 'token', 'token');
    const { user } = await render(<CreateBtn />);

    const buttons = screen.getAllByRole('button');
    const button = buttons[buttons.length - 1];

    await user.click(button);

    const mgcCreateBtn = screen.getByText('모각코');
    const thunderMgcCreateBtn = screen.getByText('⚡번개 모각코');

    expect(mgcCreateBtn).toBeInTheDocument;
    expect(thunderMgcCreateBtn).toBeInTheDocument;
  });
});

describe('로그인이 되어 있지 않은 경우', () => {
  it('버튼 클릭 시 "/signin"경로와 함께 useRouter 함수가 호출된다', async () => {
    removeItem(localStorage, 'token');
    const { user } = await render(<CreateBtn />);

    const buttons = screen.getAllByRole('button');
    const button = buttons[buttons.length - 1];

    await user.click(button);

    expect(mockPush).toBeCalledWith('/signin');
  });
});
