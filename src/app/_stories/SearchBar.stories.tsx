import { useRef, useState } from 'react';
import type { Meta } from '@storybook/react';
import SearchBar, { SearchBarProps } from '../_components/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  args: { inputRef: { current: null } },
  decorators: [(Story) => <Story />],
  argTypes: {
    inputRef: {
      description: 'input에 대한 참조를 설정하기 위한 ref 객체',
    },
    placeholder: {
      description: 'input의 placeholder',
    },
    type: {
      description: 'input의 테두리 타입',
    },
    onInputChange: {
      description: 'input의 값이 변경될 때 호출되는 함수',
    },
    onFocus: {
      description: 'input이 포커스될 때 호출되는 함수',
    },
    onBlur: {
      description: 'input에서 포커스가 해제될 때 호출되는 함수',
    },
    className: {
      description: '추가적인 스타일을 지정하기 위한 문자열',
    },
  },
};

export default meta;

export const 둥근_테두리 = (args: SearchBarProps) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  return (
    <SearchBar
      {...args}
      inputRef={inputRef}
      className={show ? 'rounded-b-none' : ''}
      onFocus={() => setShow(true)}
    />
  );
};

둥근_테두리.args = {
  placeholder: '동명(읍, 면)으로 검색(ex. 서초동)',
  type: 'radius',
};

export const 밑_테두리 = (args: SearchBarProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);

  return (
    <SearchBar
      {...args}
      inputRef={inputRef}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      className={isFocus ? 'border-opacity-main-1' : ''}
    />
  );
};

밑_테두리.args = {
  placeholder: '검색어를 두 글자 이상 입력해 주세요.',
  type: 'flat',
};
