import { Suspense } from 'react';
import React from 'react';
import Review from '@/app/chat/_components/review/Review';
import { toast } from '@/components/ui/use-toast';
import render from '@/libs/test/render';
import { USER_ID_KEY, setItem } from '@/utils/storage';
import { screen } from '@testing-library/react';
import reviewContentList from '../mocks/response/reviewContentList.json';
import responseUser from '../mocks/response/user.json';

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

const mockOnCancel = vi.fn();

async function setup() {
  const { user } = await render(
    <Suspense fallback={<div>Loading...</div>}>
      <Review
        MGCId="232"
        revieweeId={116}
        onCancel={mockOnCancel}
        isEnd
      />
    </Suspense>,
  );

  const ratingStars = await screen.findAllByLabelText('star');
  const completeButton = await screen.findByText('완료');
  const cancelButton = await screen.findByText('취소');

  const clickRatingStar = async (ratingStar: HTMLElement) => await user.click(ratingStar);

  const clickCompleteButton = async () => await user.click(completeButton);

  const clickCancelButton = async () => await user.click(cancelButton);

  return {
    user,
    ratingStars,
    clickRatingStar,
    completeButton,
    cancelButton,
    clickCompleteButton,
    clickCancelButton,
  };
}

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('모각코가 끝나기 전인 경우', async () => {
  it('완료 버튼이 비활성화 되고, "모각코 종료이후 다시 시도해주세요" 라는 toast 메시지가 나타난다', async () => {
    await render(
      <Review
        MGCId="232"
        revieweeId={116}
        onCancel={mockOnCancel}
        isEnd={false}
      />,
    );

    const button = screen.findByText('비활성');
    expect(await button).toHaveAttribute('disabled');

    expect(toast).toBeCalledWith({
      description: '모각코 종료이후 다시 시도해주세요.',
    });
  });
});

describe('모각코가 끝난 후인 경우', () => {
  it('후기 작성 화면이 나타난다.', async () => {
    const { cancelButton, completeButton } = await setup();

    const text = await screen.findByText(
      `${responseUser.userInfo.nickname}님과의 만남이 어떠셨나요?`,
    );
    const ratingStars = await screen.findAllByLabelText('star');

    for (const star of ratingStars) {
      expect(star).toHaveAttribute('fill', '#D9D9D9');
    }

    expect(text).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(completeButton).toBeInTheDocument();
  });

  it('별점을 클릭하면 0점부터 클릭한 별점까지 색이 칠해진다.', async () => {
    const { ratingStars, clickRatingStar } = await setup();

    const checkStarColor = (stars: HTMLElement[], index: number) => {
      for (const [i, star] of stars.entries()) {
        expect(star).toHaveAttribute('fill', i <= index ? '#58C694' : '#D9D9D9');
      }
    };

    await clickRatingStar(ratingStars[0]);
    checkStarColor(await screen.findAllByLabelText('star'), 0);

    await clickRatingStar(ratingStars[1]);
    checkStarColor(await screen.findAllByLabelText('star'), 1);
  });

  it('별점 2점 이하 클릭 시 부정적인 후기를 남기는 컨텐츠가 뜬다.', async () => {
    const { clickRatingStar, ratingStars } = await setup();

    await clickRatingStar(ratingStars[1]);

    const badInfoText = screen.findByText('어떤 점이 별로였나요?');
    const textAreaInfoText = screen.findByText('아쉬웠던 점을 작성해주세요.');

    for (const { content, isPositive } of reviewContentList) {
      if (!isPositive) {
        const reviewContent = screen.getByText(content);
        expect(reviewContent).toBeInTheDocument();
      }
    }

    expect(await badInfoText).toBeInTheDocument();
    expect(await textAreaInfoText).toBeInTheDocument();
  });

  it('별점 3점이상 클릭 시 긍정적인 후기를 남기는 컨텐츠가 뜬다.', async () => {
    const { clickRatingStar, ratingStars } = await setup();

    await clickRatingStar(ratingStars[2]);

    const goodInfoText = screen.findByText('어떤 점이 좋았나요?');
    const textAreaInfoText = screen.findByText('좋았던 후기를 상대방에게 알려주세요!');

    for (const { content, isPositive } of reviewContentList) {
      if (isPositive) {
        const reviewContent = screen.getByText(content);
        expect(reviewContent).toBeInTheDocument();
      }
    }

    expect(await goodInfoText).toBeInTheDocument();
    expect(await textAreaInfoText).toBeInTheDocument();
  });

  it('아무것도 선택 하지 않고 완료 버튼을 누를 시 "하나 이상 선택해주세요." 라는 문구가 나타난다.', async () => {
    const { clickRatingStar, clickCompleteButton, ratingStars } = await setup();

    await clickRatingStar(ratingStars[0]);
    await clickCompleteButton();

    const waringText = screen.getByText('하나 이상 선택해주세요.');

    expect(waringText).toBeInTheDocument();
    expect(waringText).toHaveStyle('color: rgb(239 68 68)');
  });

  it('텍스트 입력창에 300자 이상 입력 시 "입력가능한 글자수는 300자입니다." 라는 문구가 나타난다.', async () => {
    const { user, clickRatingStar, completeButton, ratingStars } = await setup();

    await clickRatingStar(ratingStars[0]);

    const overSentence =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap";
    const textarea = screen.getByPlaceholderText('여기에 적어주세요. (선택사항)');

    await user.type(textarea, overSentence);

    if (completeButton) {
      await user.click(completeButton);
    }

    const waringText = screen.getByText('입력가능한 글자수는 300자입니다.');

    expect(waringText).toBeInTheDocument();
    expect(waringText).toHaveStyle('color: rgb(239 68 68)');
  });

  it('리뷰 체크박스들 중 하나 이상 선택 후 완료 버튼 클릭 시 "후기 작성이 완료되었습니다." 라는 toast 메시지가 나타난다.', async () => {
    const { user, clickRatingStar, ratingStars } = await setup();

    setItem(localStorage, USER_ID_KEY, 105);

    await clickRatingStar(ratingStars[2]);

    const completeButton = screen.getByText('완료');
    const checkItems = screen.getAllByRole('checkbox');

    await user.click(checkItems[2]);
    await user.click(completeButton);

    expect(toast).toBeCalledWith({
      description: '후기 작성이 완료되었습니다.',
    });
    expect(mockOnCancel).toBeCalled();
  });

  it('취소 버튼 클릭 시 모달이 꺼진다.', async () => {
    const { user } = await setup();

    const cancelButton = screen.getByText('취소');

    await user.click(cancelButton);

    expect(mockOnCancel).toBeCalled();
  });
});
