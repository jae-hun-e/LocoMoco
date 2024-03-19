import { ReactNode } from 'react';
import HeaderLeft from '@/app/_components/header/HeaderLeft';
import MenuBtn from './MenuBtn';
import OptionBtn from './OptionBtn';
import ShareBtn from './ShareBtn';

interface Props {
  readonly children?: ReactNode;
}

const HeaderContainer = ({ children }: Props) => {
  return (
    <>
      <header className="fixed left-0 top-0 z-50 h-14 w-full bg-layer-1">
        <div className="flex h-full items-center justify-between px-20pxr">
          <HeaderLeft />
          {children}
        </div>
      </header>
      <div className="mb-14" />
    </>
  );
};

const Right = ({ children }: Props) => {
  return <div className="flex items-center gap-20pxr">{children}</div>;
};

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
}

const Menu = (props: ButtonProps) => <MenuBtn {...props} />;

const Share = (props: ButtonProps) => <ShareBtn {...props} />;
const Option = (props: ButtonProps) => <OptionBtn {...props} />;

const Header = Object.assign(HeaderContainer, {
  Right,
  Menu,
  Share,
  Option,
});

export default Header;
