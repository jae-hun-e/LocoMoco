import { useRef, useState } from 'react';
import useClickAway from '@/hooks/useClickaway';
import type { Meta } from '@storybook/react';
import AddressList from '../(home)/_components/AddressList';
import SearchBar from '../_components/SearchBar';
import SearchBarFilter, { SearchBarFilterProps } from '../_components/SearchBarFilter';

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
    open: {
      description: '필터의 오픈 여부',
    },
    setOpen: {
      description: '필터 오픈 상태를 변경하는 함수',
    },
  },
};

export default meta;

export const 지도_페이지_서치바_필터 = (args: SearchBarFilterProps) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const clickAwayRef = useClickAway<HTMLDivElement>(() => setShow(false));

  return (
    <SearchBarFilter
      {...args}
      open={open}
      setOpen={setOpen}
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
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  return (
    <SearchBarFilter
      {...args}
      open={open}
      setOpen={setOpen}
      renderComponent={() => (
        <form
          onSubmit={() => setOpen(false)}
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
