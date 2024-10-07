import { useRef, useState } from 'react';
import useClickAway from '@/hooks/useClickaway';
import type { Meta } from '@storybook/react';
import AddressList from '../(home)/_components/AddressList';
import SearchBar from '../_components/SearchBar';
import SearchBarFilter, { SearchBarFilterProps } from '../_components/SearchBarFilter';
import { OpenInfo } from '../search/page';

const openInfoDummy: OpenInfo = {
  isOpen: false,
  triggerType: 'category',
};

const meta: Meta<typeof SearchBarFilter> = {
  title: 'Components/SearchBarFilter',
  component: SearchBarFilter,
  decorators: [
    (Story) => (
      <div className="min-h-100pxr">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      description:
        '컴포넌트의 전체 너비, 버튼 내부 아이콘 종류 및 위치, 선택 완료 시 버튼 색상을 결정',
    },
    renderComponent: {
      description: '렌더될 인풋 컴포넌트',
    },
    openInfo: {
      description: '필터가 열렸는지 여부와 어떤 요소에 의해 열렸는지를 나타내는 속성',
    },
    setOpenInfo: {
      description: '필터 오픈 상태를 변경하는 함수',
    },
  },
};

export default meta;

export const 지도_페이지_서치바_필터 = (args: SearchBarFilterProps) => {
  const [show, setShow] = useState(false);
  const [openInfo, setOpenInfo] = useState(openInfoDummy);
  const inputRef = useRef(null);
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setShow(false));

  return (
    <SearchBarFilter
      {...args}
      openInfo={openInfo}
      setOpenInfo={setOpenInfo}
      renderComponent={() => (
        <div
          className="relative"
          ref={clickAwayRef}
        >
          <SearchBar
            type="radius"
            inputRef={inputRef}
            className={`${show ? 'rounded-b-none' : ''} ${!open ? 'shadow-md' : ''}`}
            onFocus={() => setShow(true)}
            placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
          />
          {show ? (
            <AddressList
              onClick={() => {}}
              address={[]}
            />
          ) : null}
        </div>
      )}
    />
  );
};

지도_페이지_서치바_필터.args = {
  type: 'map',
};

export const 검색_페이지_서치바_필터 = (args: SearchBarFilterProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [openInfo, setOpenInfo] = useState(openInfoDummy);
  const inputRef = useRef(null);

  return (
    <SearchBarFilter
      {...args}
      openInfo={openInfo}
      setOpenInfo={setOpenInfo}
      renderComponent={() => (
        <form
          onSubmit={() => setOpenInfo({ ...openInfo, isOpen: false })}
          className="relative mb-8pxr"
        >
          <SearchBar
            type="flat"
            inputRef={inputRef}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className={isFocus ? 'border-opacity-main-1' : ''}
            placeholder="검색어를 두 글자 이상 입력해 주세요."
          />
        </form>
      )}
    />
  );
};

검색_페이지_서치바_필터.args = {
  type: 'search',
};
